import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Baby, Users, Heart } from 'lucide-react';
import { poshanTrackerSummaryData, poshanBeneficiaryCategories, poshanNitiAayogData, poshanDailyMonitoringData } from '@/app/data/staticData';

const PoshanTrackerSummary: React.FC = () => {
  const { totalRegistered, aadhaarVerified, growthMonitoringEligible, growthMonitoringMeasured, snpEligible, snpReceived, homeVisitsScheduled, homeVisitsCompleted } = poshanTrackerSummaryData;
  const { underweightChildrenPercentage, stuntedChildrenPercentage, samChildrenPercentage, mamChildrenPercentage, awcOwnBuildingPercentage, awcConductedVHSNDPercentage } = poshanNitiAayogData;
  const { totalAWCOpen, awcOpenedOutsideFencedArea, awcDidntOpen, totalChildren3YrTo6Yr, totalChildrenAttended, morningSnackGiven, totalHCMGiven, imageCaptured, noOfAWcCompletedECCE } = poshanDailyMonitoringData;

  const aadhaarVerificationRate = totalRegistered > 0 ? (aadhaarVerified / totalRegistered * 100).toFixed(1) : 0;
  const growthMonitoringRate = growthMonitoringEligible > 0 ? (growthMonitoringMeasured / growthMonitoringEligible * 100).toFixed(1) : 0;
  const snpCoverageRate = snpEligible > 0 ? (snpReceived / snpEligible * 100).toFixed(1) : 0;
  const homeVisitsRate = homeVisitsScheduled > 0 ? (homeVisitsCompleted / homeVisitsScheduled * 100).toFixed(1) : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Progress Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Baby className="h-5 w-5 text-blue-600" />
              Poshan Tracker Key Metrics (Simulated Data)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Aadhaar Verification</span>
                <span className="text-sm text-muted-foreground">{aadhaarVerificationRate}% ({aadhaarVerified.toLocaleString()} / {totalRegistered.toLocaleString()})</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-blue-600 h-3 rounded-full" style={{width: `${aadhaarVerificationRate}%`}}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Growth Monitoring (Children)</span>
                <span className="text-sm text-muted-foreground">{growthMonitoringRate}% ({growthMonitoringMeasured.toLocaleString()} / {growthMonitoringEligible.toLocaleString()})</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-green-600 h-3 rounded-full" style={{width: `${growthMonitoringRate}%`}}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Supplementary Nutrition (SNP) Coverage</span>
                <span className="text-sm text-muted-foreground">{snpCoverageRate}% ({snpReceived.toLocaleString()} / {snpEligible.toLocaleString()})</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-orange-500 h-3 rounded-full" style={{width: `${snpCoverageRate}%`}}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Home Visits Completion</span>
                <span className="text-sm text-muted-foreground">{homeVisitsRate}% ({homeVisitsCompleted.toLocaleString()} / {homeVisitsScheduled.toLocaleString()})</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-purple-500 h-3 rounded-full" style={{width: `${homeVisitsRate}%`}}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Side Cards */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-indigo-600" />
                Beneficiary Overview (Simulated Data)
              </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="p-3 bg-indigo-50 rounded-lg mb-3">
                    <p className="font-semibold text-indigo-800">Total Registered Beneficiaries</p>
                    <p className="text-3xl font-bold text-indigo-800">{totalRegistered.toLocaleString()}</p>
                </div>
              <div className="space-y-3">
                {poshanBeneficiaryCategories.map(cat => (
                  <div key={cat.name} className={`flex justify-between items-center p-2.5 rounded-md ${cat.bgColor}`}>
                    <div className="flex items-center gap-2">
                        <cat.icon className={`h-4 w-4 ${cat.color}`} />
                        <span className={`text-sm ${cat.color}`}>{cat.name}</span>
                    </div>
                    <span className={`font-semibold text-sm ${cat.color}`}>{cat.count.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Additional Info Cards - From NITI Aayog Report (April 2025) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-md flex items-center gap-2">
                    Underweight Children (0-6 yrs)
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold text-purple-700">{underweightChildrenPercentage}%<small className="text-sm text-muted-foreground ml-1"></small></p>
                <p className="text-xs text-muted-foreground">This percentage is from the NITI Aayog report for April 2025.</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-md flex items-center gap-2">
                    Stunted Children (0-6 yrs)
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold text-cyan-700">{stuntedChildrenPercentage}%<small className="text-sm text-muted-foreground ml-1"></small></p>
                <p className="text-xs text-muted-foreground">This percentage is from the NITI Aayog report for April 2025.</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-md flex items-center gap-2">
                    SAM Children (0-6 yrs)
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold text-red-700">{samChildrenPercentage}%<small className="text-sm text-muted-foreground ml-1"></small></p>
                <p className="text-xs text-muted-foreground">This percentage is from the NITI Aayog report for April 2025.</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-md flex items-center gap-2">
                    MAM Children (0-6 yrs)
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold text-orange-700">{mamChildrenPercentage}%<small className="text-sm text-muted-foreground ml-1"></small></p>
                <p className="text-xs text-muted-foreground">This percentage is from the NITI Aayog report for April 2025.</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-md flex items-center gap-2">
                    AWCs with Own Buildings
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold text-blue-700">{awcOwnBuildingPercentage}%<small className="text-sm text-muted-foreground ml-1"></small></p>
                <p className="text-xs text-muted-foreground">This percentage is from the NITI Aayog report for April 2025.</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-md flex items-center gap-2">
                    AWCs Conducted VHSND
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold text-green-700">{awcConductedVHSNDPercentage}%<small className="text-sm text-muted-foreground ml-1"></small></p>
                <p className="text-xs text-muted-foreground">This percentage is from the NITI Aayog report for April 2025.</p>
            </CardContent>
        </Card>
      </div>

      {/* Daily Monitoring (May 2025 Data from Screenshot 133) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-md flex items-center gap-2">
                    Total AWC Open (May 2025)
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold text-amber-700">{totalAWCOpen.toLocaleString()}<small className="text-sm text-muted-foreground ml-1"></small></p>
                <p className="text-xs text-muted-foreground">Total Anganwadi Centers reported open from May 2025 data.</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-md flex items-center gap-2">
                    AWCs Opened Outside Fenced Area
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold text-red-700">{awcOpenedOutsideFencedArea.toLocaleString()}<small className="text-sm text-muted-foreground ml-1"></small></p>
                <p className="text-xs text-muted-foreground">AWCs reported open but located outside a fenced area from May 2025 data.</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-md flex items-center gap-2">
                    AWCs Didn't Open
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold text-gray-700">{awcDidntOpen.toLocaleString()}<small className="text-sm text-muted-foreground ml-1"></small></p>
                <p className="text-xs text-muted-foreground">Anganwadi Centers reported as not open from May 2025 data.</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-md flex items-center gap-2">
                    Total Children (3-6 Yrs)
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold text-purple-700">{totalChildren3YrTo6Yr.toLocaleString()}<small className="text-sm text-muted-foreground ml-1"></small></p>
                <p className="text-xs text-muted-foreground">Total children aged 3-6 years recorded from May 2025 data.</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-md flex items-center gap-2">
                    Total Children Attended
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold text-teal-700">{totalChildrenAttended.toLocaleString()}<small className="text-sm text-muted-foreground ml-1"></small></p>
                <p className="text-xs text-muted-foreground">Children who attended the Anganwadi Centers from May 2025 data.</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-md flex items-center gap-2">
                    Morning Snack Given
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold text-amber-700">{morningSnackGiven.toLocaleString()}<small className="text-sm text-muted-foreground ml-1"></small></p>
                <p className="text-xs text-muted-foreground">Children who received morning snack from May 2025 data.</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-md flex items-center gap-2">
                    Total HCM Given
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold text-lime-700">{totalHCMGiven.toLocaleString()}<small className="text-sm text-muted-foreground ml-1"></small></p>
                <p className="text-xs text-muted-foreground">Children who received Hot Cooked Meal from May 2025 data.</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-md flex items-center gap-2">
                    Image Captured
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold text-gray-700">{imageCaptured.toLocaleString()}<small className="text-sm text-muted-foreground ml-1"></small></p>
                <p className="text-xs text-muted-foreground">Images captured for reporting from May 2025 data.</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-md flex items-center gap-2">
                    No. of AWC Completed ECCE
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold text-indigo-700">{noOfAWcCompletedECCE.toLocaleString()}<small className="text-sm text-muted-foreground ml-1"></small></p>
                <p className="text-xs text-muted-foreground">Anganwadi Centers that completed Early Childhood Care and Education from May 2025 data.</p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PoshanTrackerSummary;