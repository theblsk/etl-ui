import type { Report } from '../types';

export interface DashboardMetrics {
  totalRevenue: number;
  totalProfit: number;
  averageMargin: number;
  profitableMonths: number;
  totalMonths: number;
  bestMonth: Report | null;
  worstMonth: Report | null;
  revenueGrowth: number;
  profitGrowth: number;
}

export interface TrendData {
  period: string;
  grossProfit: number;
  netProfit: number;
  margin: number;
}

export const calculateDashboardMetrics = (reports: Report[]): DashboardMetrics => {
  if (!reports || reports.length === 0) {
    return {
      totalRevenue: 0,
      totalProfit: 0,
      averageMargin: 0,
      profitableMonths: 0,
      totalMonths: 0,
      bestMonth: null,
      worstMonth: null,
      revenueGrowth: 0,
      profitGrowth: 0,
    };
  }

  // Filter out reports with zero values and sort by date
  const validReports = reports
    .filter(report => parseFloat(report.grossProfit) !== 0 || parseFloat(report.netProfit) !== 0)
    .sort((a, b) => new Date(a.periodStart).getTime() - new Date(b.periodStart).getTime());

  const totalRevenue = validReports.reduce((sum, report) => sum + parseFloat(report.grossProfit), 0);
  const totalProfit = validReports.reduce((sum, report) => sum + parseFloat(report.netProfit), 0);
  const profitableMonths = validReports.filter(report => parseFloat(report.netProfit) > 0).length;
  
  // Calculate average margin
  const margins = validReports
    .filter(report => parseFloat(report.grossProfit) > 0)
    .map(report => (parseFloat(report.netProfit) / parseFloat(report.grossProfit)) * 100);
  const averageMargin = margins.length > 0 ? margins.reduce((sum, margin) => sum + margin, 0) / margins.length : 0;

  // Find best and worst months
  const bestMonth = validReports.reduce((best, current) => 
    parseFloat(current.netProfit) > parseFloat(best.netProfit) ? current : best
  );
  const worstMonth = validReports.reduce((worst, current) => 
    parseFloat(current.netProfit) < parseFloat(worst.netProfit) ? current : worst
  );

  // Calculate growth rates (comparing first and last quarters)
  let revenueGrowth = 0;
  let profitGrowth = 0;
  
  if (validReports.length >= 2) {
    const firstQuarter = validReports.slice(0, 3);
    const lastQuarter = validReports.slice(-3);
    
    const firstQuarterRevenue = firstQuarter.reduce((sum, report) => sum + parseFloat(report.grossProfit), 0) / firstQuarter.length;
    const lastQuarterRevenue = lastQuarter.reduce((sum, report) => sum + parseFloat(report.grossProfit), 0) / lastQuarter.length;
    
    const firstQuarterProfit = firstQuarter.reduce((sum, report) => sum + parseFloat(report.netProfit), 0) / firstQuarter.length;
    const lastQuarterProfit = lastQuarter.reduce((sum, report) => sum + parseFloat(report.netProfit), 0) / lastQuarter.length;
    
    if (firstQuarterRevenue > 0) {
      revenueGrowth = ((lastQuarterRevenue - firstQuarterRevenue) / firstQuarterRevenue) * 100;
    }
    
    if (firstQuarterProfit > 0) {
      profitGrowth = ((lastQuarterProfit - firstQuarterProfit) / firstQuarterProfit) * 100;
    }
  }

  return {
    totalRevenue,
    totalProfit,
    averageMargin,
    profitableMonths,
    totalMonths: validReports.length,
    bestMonth,
    worstMonth,
    revenueGrowth,
    profitGrowth,
  };
};

export const prepareTrendData = (reports: Report[]): TrendData[] => {
  return reports
    .filter(report => parseFloat(report.grossProfit) !== 0 || parseFloat(report.netProfit) !== 0)
    .sort((a, b) => new Date(a.periodStart).getTime() - new Date(b.periodStart).getTime())
    .map(report => ({
      period: new Date(report.periodStart).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
      }),
      grossProfit: parseFloat(report.grossProfit),
      netProfit: parseFloat(report.netProfit),
      margin: parseFloat(report.grossProfit) > 0 
        ? (parseFloat(report.netProfit) / parseFloat(report.grossProfit)) * 100 
        : 0,
    }));
};

export const getFinancialInsights = (metrics: DashboardMetrics): string[] => {
  const insights: string[] = [];
  
  if (metrics.profitableMonths / metrics.totalMonths > 0.8) {
    insights.push("Strong profitability with 80%+ profitable months");
  } else if (metrics.profitableMonths / metrics.totalMonths > 0.6) {
    insights.push("Good profitability with 60%+ profitable months");
  } else {
    insights.push("Profitability needs improvement");
  }
  
  if (metrics.averageMargin > 20) {
    insights.push("Excellent profit margins above 20%");
  } else if (metrics.averageMargin > 10) {
    insights.push("Healthy profit margins above 10%");
  } else if (metrics.averageMargin > 0) {
    insights.push("Profit margins could be improved");
  }
  
  if (metrics.revenueGrowth > 10) {
    insights.push("Strong revenue growth trend");
  } else if (metrics.revenueGrowth > 0) {
    insights.push("Positive revenue growth");
  } else {
    insights.push("Revenue growth needs attention");
  }
  
  if (metrics.profitGrowth > 15) {
    insights.push("Excellent profit growth trajectory");
  } else if (metrics.profitGrowth > 0) {
    insights.push("Positive profit growth");
  } else {
    insights.push("Profit growth requires focus");
  }
  
  return insights;
}; 