
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Lightbulb, TrendingUp, AlertTriangle, BarChart3, LineChart, ArrowRight, Search, RefreshCw } from 'lucide-react';

// Sample insights data
const insightsSummary = {
  totalInsights: 24,
  newInsights: 6,
  recommendationsImplemented: 14,
  impactScore: 8.6,
};

const keyInsights = [
  { 
    id: "INS-001", 
    title: "Healthcare Resource Optimization", 
    description: "ML analysis shows 24% inefficiency in healthcare resource allocation. Reallocating resources based on predicted demand patterns could improve outcomes by 18%.",
    category: "Healthcare",
    impact: "High",
    confidence: 92,
    createdAt: "2023-11-15"
  },
  { 
    id: "INS-002", 
    title: "Education Dropout Risk Prediction", 
    description: "Predictive model identifies 240 students at high risk of dropping out. Early intervention could reduce dropout rates by 35%.",
    category: "Education",
    impact: "High",
    confidence: 87,
    createdAt: "2023-12-02"
  },
  { 
    id: "INS-003", 
    title: "Infrastructure Maintenance Prioritization", 
    description: "Predictive maintenance model shows 18 bridges requiring urgent attention. Addressing these could prevent safety issues and save 42% in long-term repair costs.",
    category: "Infrastructure",
    impact: "Medium",
    confidence: 85,
    createdAt: "2023-12-10"
  },
  { 
    id: "INS-004", 
    title: "Agricultural Yield Optimization", 
    description: "AI model suggests crop rotation patterns that could increase yields by 28% in drought-prone areas.",
    category: "Agriculture",
    impact: "High",
    confidence: 82,
    createdAt: "2023-12-15"
  },
  { 
    id: "INS-005", 
    title: "Budget Allocation Efficiency", 
    description: "ML analysis reveals 16% of budget could be reallocated for higher impact outcomes based on historical performance data.",
    category: "Finance",
    impact: "Medium",
    confidence: 89,
    createdAt: "2023-12-22"
  },
  { 
    id: "INS-006", 
    title: "Welfare Program Targeting Improvement", 
    description: "Model identifies 1,200 households eligible for welfare programs but not currently enrolled. Targeted outreach could improve coverage by 14%.",
    category: "Social Welfare",
    impact: "High",
    confidence: 91,
    createdAt: "2024-01-05"
  },
];

const anomalies = [
  { 
    id: "ANO-001", 
    title: "Sudden Drop in Healthcare Utilization", 
    description: "Unexpected 28% decrease in healthcare facility utilization in northern districts. Requires investigation.",
    category: "Healthcare",
    severity: "High",
    detectedAt: "2024-01-12"
  },
  { 
    id: "ANO-002", 
    title: "Unusual Education Budget Spending Pattern", 
    description: "Spending pattern deviation detected in education budget. 33% faster depletion rate than historical patterns.",
    category: "Education",
    severity: "Medium",
    detectedAt: "2024-01-08"
  },
  { 
    id: "ANO-003", 
    title: "Infrastructure Project Delay Cluster", 
    description: "Statistical anomaly detected: 45% of infrastructure projects in western region showing synchronized delays.",
    category: "Infrastructure",
    severity: "High",
    detectedAt: "2024-01-10"
  },
];

const forecasts = [
  { 
    id: "FOR-001", 
    title: "Healthcare Demand Surge", 
    description: "Predicted 32% increase in healthcare service demand in southeastern districts over next 6 months based on demographic and seasonal trends.",
    category: "Healthcare",
    timeframe: "6 months",
    confidence: 86,
    updatedAt: "2024-01-08"
  },
  { 
    id: "FOR-002", 
    title: "Education Infrastructure Needs", 
    description: "Projected 28% increase in school enrollment in urban areas by next academic year, requiring capacity planning.",
    category: "Education",
    timeframe: "10 months",
    confidence: 83,
    updatedAt: "2024-01-05"
  },
  { 
    id: "FOR-003", 
    title: "Agricultural Yield Projection", 
    description: "Model predicts 18% decrease in crop yields for upcoming season due to projected weather patterns. Mitigation strategies recommended.",
    category: "Agriculture",
    timeframe: "3 months",
    confidence: 78,
    updatedAt: "2024-01-11"
  },
];

const InsightsView = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  
  const filteredInsights = keyInsights.filter(insight => 
    (activeCategory === "All" || insight.category === activeCategory) &&
    (searchQuery === "" || 
     insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     insight.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">AI Insights Dashboard</h1>
      
      {/* Insights Summary */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                <Lightbulb size={24} className="text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Insights</p>
                <p className="text-2xl font-bold">{insightsSummary.totalInsights}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-600">
                  <path d="M12 7V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">New Insights</p>
                <p className="text-2xl font-bold">{insightsSummary.newInsights}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                <TrendingUp size={24} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Implemented</p>
                <p className="text-2xl font-bold">{insightsSummary.recommendationsImplemented}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-600">
                  <path d="M3 20.2895V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V15C21 16.1046 20.1046 17 19 17H7.96125C7.35368 17 6.77906 17.2762 6.39951 17.7506L4.06852 20.6643C3.71421 21.1072 3 20.8567 3 20.2895Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 7H16M8 11H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Impact Score</p>
                <p className="text-2xl font-bold">{insightsSummary.impactScore}/10</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Insights Tabs */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <CardTitle>AI-Generated Insights</CardTitle>
              <CardDescription>Machine learning derived recommendations and patterns</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <input
                  type="search"
                  placeholder="Search insights..."
                  className="pl-9 pr-4 py-2 text-sm rounded-md border border-gray-300 w-full md:w-60 focus:outline-none focus:ring-2 focus:ring-gov-blue focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <RefreshCw size={14} />
                <span>Refresh</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="insights">
            <TabsList className="mb-4">
              <TabsTrigger value="insights">Key Insights</TabsTrigger>
              <TabsTrigger value="anomalies">Anomalies</TabsTrigger>
              <TabsTrigger value="forecasts">Forecasts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="insights">
              <div className="flex overflow-x-auto pb-2 mb-4 space-x-2 scrollbar-thin">
                <Button 
                  variant={activeCategory === "All" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setActiveCategory("All")}
                >
                  All
                </Button>
                <Button 
                  variant={activeCategory === "Healthcare" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setActiveCategory("Healthcare")}
                >
                  Healthcare
                </Button>
                <Button 
                  variant={activeCategory === "Education" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setActiveCategory("Education")}
                >
                  Education
                </Button>
                <Button 
                  variant={activeCategory === "Infrastructure" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setActiveCategory("Infrastructure")}
                >
                  Infrastructure
                </Button>
                <Button 
                  variant={activeCategory === "Agriculture" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setActiveCategory("Agriculture")}
                >
                  Agriculture
                </Button>
                <Button 
                  variant={activeCategory === "Finance" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setActiveCategory("Finance")}
                >
                  Finance
                </Button>
                <Button 
                  variant={activeCategory === "Social Welfare" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setActiveCategory("Social Welfare")}
                >
                  Social Welfare
                </Button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {filteredInsights.map((insight) => (
                  <Card key={insight.id} className="border-l-4 border-l-indigo-500">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <div>
                          <CardTitle className="text-lg">{insight.title}</CardTitle>
                          <CardDescription>{insight.category} • {insight.createdAt}</CardDescription>
                        </div>
                        <div className="flex items-center">
                          <span className={`px-2 py-1 rounded text-xs ${
                            insight.impact === 'High' ? 'bg-red-100 text-red-800' : 
                            insight.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {insight.impact} Impact
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">{insight.description}</p>
                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-500">ML Confidence</span>
                          <span className="font-medium">{insight.confidence}%</span>
                        </div>
                        <Progress value={insight.confidence} className="h-1.5" />
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0 justify-end">
                      <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50">
                        <span>View Details</span>
                        <ArrowRight size={16} className="ml-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="anomalies">
              <div className="space-y-4">
                {anomalies.map((anomaly) => (
                  <Card key={anomaly.id} className="border-l-4 border-l-orange-500">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <div>
                          <div className="flex items-center">
                            <AlertTriangle size={16} className="text-orange-500 mr-2" />
                            <CardTitle className="text-lg">{anomaly.title}</CardTitle>
                          </div>
                          <CardDescription>{anomaly.category} • Detected on {anomaly.detectedAt}</CardDescription>
                        </div>
                        <div className="flex items-center">
                          <span className={`px-2 py-1 rounded text-xs ${
                            anomaly.severity === 'High' ? 'bg-red-100 text-red-800' : 
                            anomaly.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {anomaly.severity} Severity
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">{anomaly.description}</p>
                    </CardContent>
                    <CardFooter className="pt-0 justify-end">
                      <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-800 hover:bg-orange-50">
                        <span>Investigate</span>
                        <ArrowRight size={16} className="ml-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="forecasts">
              <div className="space-y-4">
                {forecasts.map((forecast) => (
                  <Card key={forecast.id} className="border-l-4 border-l-blue-500">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <div>
                          <div className="flex items-center">
                            <LineChart size={16} className="text-blue-500 mr-2" />
                            <CardTitle className="text-lg">{forecast.title}</CardTitle>
                          </div>
                          <CardDescription>{forecast.category} • {forecast.timeframe} forecast • Updated on {forecast.updatedAt}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">{forecast.description}</p>
                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-500">ML Confidence</span>
                          <span className="font-medium">{forecast.confidence}%</span>
                        </div>
                        <Progress value={forecast.confidence} className="h-1.5" />
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0 justify-end">
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50">
                        <span>View Projection</span>
                        <ArrowRight size={16} className="ml-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* ML Query Interface */}
      <Card>
        <CardHeader>
          <CardTitle>Advanced ML Query</CardTitle>
          <CardDescription>Analyze district data using natural language</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Ask a question about district data (e.g., 'Which areas have the highest education needs?')"
                className="flex-1 px-4 py-3 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gov-blue focus:border-transparent"
              />
              <Button>
                Analyze
              </Button>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="flex items-center mb-4">
                <Lightbulb size={20} className="text-indigo-600 mr-2" />
                <h3 className="text-md font-medium">Sample ML Query Capabilities</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 mr-2"></span>
                  <span>"Identify areas with highest healthcare needs"</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 mr-2"></span>
                  <span>"Compare budget utilization across departments"</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 mr-2"></span>
                  <span>"Predict project completion timelines based on historical data"</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 mr-2"></span>
                  <span>"Where are resources being underutilized?"</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 mr-2"></span>
                  <span>"Show correlation between budget allocation and development indicators"</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InsightsView;
