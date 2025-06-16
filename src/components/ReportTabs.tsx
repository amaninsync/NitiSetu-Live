import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, MapPin, Heart, BarChart3, Home } from 'lucide-react';

// --- STANDARDIZED AND CLEANED DATA SECTION ---

// A helper function to create a consistent AWC name format
const formatAwcName = (name, code) => `${name.replace(/\(\d+\)/, '').trim()} (${code})`;

// 1. Cleaned PHC Mapping Data -> This is now our primary source for AWC names and codes
const phcMappingData = [
    { districtName: "Asifabad", mandalName: "ASIFABAD", phcName: "ASIFABAD", subCenterName: "Gundi", gpName: "Gundi", awcName: "Gundi-1 (01010118)", awcCode: "01010118" },
    { districtName: "Asifabad", mandalName: "ASIFABAD", phcName: "ASIFABAD", subCenterName: "Gundi", gpName: "Gundi", awcName: "Gundi-2 (01010119)", awcCode: "01010119" },
    { districtName: "Asifabad", mandalName: "ASIFABAD", phcName: "ASIFABAD", subCenterName: "Routasankepally", gpName: "Routsankepalle", awcName: "Routasankepally (01010134)", awcCode: "01010134" },
    { districtName: "Asifabad", mandalName: "ASIFABAD", phcName: "ASIFABAD", subCenterName: "Routasankepally", gpName: "Ada", awcName: "Ada-1 (01010101)", awcCode: "01010101" },
    { districtName: "Asifabad", mandalName: "ASIFABAD", phcName: "ASIFABAD", subCenterName: "Routasankepally", gpName: "Ada", awcName: "Ada-2 (01010102)", awcCode: "01010102" },
    { districtName: "Asifabad", mandalName: "ASIFABAD", phcName: "ASIFABAD", subCenterName: "Yellaram", gpName: "Yellaram", awcName: "Yellaram-1 (01010143)", awcCode: "01010143" },
    { districtName: "Asifabad", mandalName: "ASIFABAD", phcName: "ASIFABAD", subCenterName: "Yellaram", gpName: "Yellaram", awcName: "Yellaram-2 (01010144)", awcCode: "01010144" },
    { districtName: "Asifabad", mandalName: "ASIFABAD", phcName: "ASIFABAD", subCenterName: "Yellaram", gpName: "Yellaram", awcName: "Yellaram-3 (01010145)", awcCode: "01010145" },
    { districtName: "Asifabad", mandalName: "ASIFABAD", phcName: "ASIFABAD", subCenterName: "Yellaram", gpName: "Yellaram", awcName: "Yellaram-4 (01010146)", awcCode: "01010146" },
    { districtName: "Asifabad", mandalName: "ASIFABAD", phcName: "ASIFABAD", subCenterName: "Yellaram", gpName: "Babapur", awcName: "Babapur-1 (01010105)", awcCode: "01010105" },
    { districtName: "Asifabad", mandalName: "ASIFABAD", phcName: "ASIFABAD", subCenterName: "Yellaram", gpName: "Babapur", awcName: "Babapur-2 (01010106)", awcCode: "01010106" }
];

// 2. Location Mapping Data with AWC level detail (derived from PHC Mapping)
const locationMapping = phcMappingData.map(item => ({
    division: item.districtName === 'Asifabad' ? 'Asifabad' : 'Kagaznagar', // Example logic, adjust if needed
    mandal: item.mandalName,
    panchayat: item.gpName,
    awc: item.awcName
}));


// 3. Cleaned FCR Report Data
const fcrReportData = [
    { district: "Asifabad", mandalName: "ASIFABAD", totalAwcs: "260", awcsReported: "260", awcsNotReported: "0", riceOpening: "20252.472", riceReceived: "12950", riceUtilized: "12260.963", riceBalance: "20941.509", dalOpening: "4062.59", dalReceived: "2590", dalUtilized: "2452.193", dalBalance: "4200.397", oilOpening: "1645.719", oilReceived: "1295", oilUtilized: "1226.096", oilBalance: "1714.623", eggsOpening: "1430", eggsReceived: "36120", eggsUtilized: "35992", eggsBalance: "1558", balamruthamOpening: "3476.326", balamruthamReceived: "3225", balamruthamUtilized: "3228.6", balamruthamBalance: "3472.726" },
    { district: "Asifabad", mandalName: "JAINOOR", totalAwcs: "175", awcsReported: "175", awcsNotReported: "0", riceOpening: "14067.419", riceReceived: "9550", riceUtilized: "10550.834", riceBalance: "13066.585", dalOpening: "3024.088", dalReceived: "1910", dalUtilized: "2110.167", dalBalance: "2823.921", oilOpening: "1206.139", oilReceived: "955", oilUtilized: "1055.083", oilBalance: "1106.056", eggsOpening: "768", eggsReceived: "26325", eggsUtilized: "25768", eggsBalance: "1325", balamruthamOpening: "2199.19", balamruthamReceived: "2550", balamruthamUtilized: "2467.4", balamruthamBalance: "2281.79" },
    { district: "Asifabad", mandalName: "KAGAZNAGAR", totalAwcs: "180", awcsReported: "180", awcsNotReported: "0", riceOpening: "15432.125", riceReceived: "8750", riceUtilized: "11250.45", riceBalance: "12931.675", dalOpening: "3190.425", dalReceived: "1750", dalUtilized: "2250.09", dalBalance: "2690.335", oilOpening: "1296.088", oilReceived: "875", oilUtilized: "1125.045", oilBalance: "1046.043", eggsOpening: "1030", eggsReceived: "24300", eggsUtilized: "24185", eggsBalance: "1145", balamruthamOpening: "2511.9", balamruthamReceived: "2100", balamruthamUtilized: "2674.5", balamruthamBalance: "1937.4" },
    { district: "Asifabad", mandalName: "SIRPUR", totalAwcs: "195", awcsReported: "195", awcsNotReported: "0", riceOpening: "18245.875", riceReceived: "10200", riceUtilized: "13150.225", riceBalance: "15295.65", dalOpening: "3801.375", dalReceived: "2040", dalUtilized: "2630.045", dalBalance: "3211.33", oilOpening: "1504.15", oilReceived: "1020", oilUtilized: "1315.023", oilBalance: "1209.127", eggsOpening: "1240", eggsReceived: "28125", eggsUtilized: "27980", eggsBalance: "1385", balamruthamOpening: "2795.25", balamruthamReceived: "2550", balamruthamUtilized: "2948.4", balamruthamBalance: "2396.85" },
    { district: "Asifabad", mandalName: "MANCHERIAL", totalAwcs: "163", awcsReported: "163", awcsNotReported: "0", riceOpening: "12875.34", riceReceived: "8950", riceUtilized: "9875.68", riceBalance: "11949.66", dalOpening: "2508.973", dalReceived: "1790", dalUtilized: "1975.136", dalBalance: "2323.837", oilOpening: "1015.07", oilReceived: "895", oilUtilized: "987.568", oilBalance: "922.502", eggsOpening: "987", eggsReceived: "24840", eggsUtilized: "24560", eggsBalance: "1267", balamruthamOpening: "2019.89", balamruthamReceived: "2250", balamruthamUtilized: "2184.4", balamruthamBalance: "2085.49" }
];

// 4. Cleaned THR Report Data
const thrReportData = [
    { districtName: "Asifabad", mandalName: "ASIFABAD", sectorName: "ASIFABAD", awcName: "Kosara-1 (01010129)", children7m3yTotal: "17", children7m3yGiven: "17", children3y6yTotal: "21", children3y6yGiven: "21", pregWomenTotal: "3", pregWomenGiven: "3", lacMothersTotal: "4", lacMothersGiven: "4" },
    { districtName: "Asifabad", mandalName: "ASIFABAD", sectorName: "ASIFABAD", awcName: "Kosara-2 (01010130)", children7m3yTotal: "12", children7m3yGiven: "12", children3y6yTotal: "15", children3y6yGiven: "15", pregWomenTotal: "2", pregWomenGiven: "2", lacMothersTotal: "3", lacMothersGiven: "3" },
    { districtName: "Asifabad", mandalName: "ASIFABAD", sectorName: "ASIFABAD", awcName: "Venkatapur (01010141)", children7m3yTotal: "10", children7m3yGiven: "10", children3y6yTotal: "13", children3y6yGiven: "13", pregWomenTotal: "1", pregWomenGiven: "1", lacMothersTotal: "2", lacMothersGiven: "2" },
    { districtName: "Asifabad", mandalName: "ASIFABAD", sectorName: "ASIFABAD", awcName: "Tumpalli (01010139)", children7m3yTotal: "8", children7m3yGiven: "8", children3y6yTotal: "11", children3y6yGiven: "11", pregWomenTotal: "2", pregWomenGiven: "2", lacMothersTotal: "2", lacMothersGiven: "2" },
    { districtName: "Asifabad", mandalName: "ASIFABAD", sectorName: "ASIFABAD", awcName: "Appapally (01010103)", children7m3yTotal: "15", children7m3yGiven: "15", children3y6yTotal: "18", children3y6yGiven: "18", pregWomenTotal: "3", pregWomenGiven: "3", lacMothersTotal: "3", lacMothersGiven: "3" },
    { districtName: "Asifabad", mandalName: "ASIFABAD", sectorName: "ASIFABAD", awcName: "Koutaguda (01010131)", children7m3yTotal: "9", children7m3yGiven: "9", children3y6yTotal: "12", children3y6yGiven: "12", pregWomenTotal: "1", pregWomenGiven: "1", lacMothersTotal: "1", lacMothersGiven: "1" }
];

// 5. Cleaned Utilization Report Data
const utilizationReportData = [
    { districtName: "Asifabad", mandalName: "ASIFABAD", sectorName: "ASIFABAD", awcCode: "01010129", awcName: "Kosara-1 (01010129)", awcOpen: "Yes", childrenEnrolled: "21", childrenAttended: "18", morningSnackGiven: "18", hcmGiven: "18", ecceConducted: "Yes", imageCaptured: "Yes" },
    { districtName: "Asifabad", mandalName: "ASIFABAD", sectorName: "ASIFABAD", awcCode: "01010130", awcName: "Kosara-2 (01010130)", awcOpen: "Yes", childrenEnrolled: "15", childrenAttended: "14", morningSnackGiven: "14", hcmGiven: "14", ecceConducted: "Yes", imageCaptured: "Yes" },
    { districtName: "Asifabad", mandalName: "ASIFABAD", sectorName: "ASIFABAD", awcCode: "01010141", awcName: "Venkatapur (01010141)", awcOpen: "Yes", childrenEnrolled: "13", childrenAttended: "11", morningSnackGiven: "11", hcmGiven: "11", ecceConducted: "Yes", imageCaptured: "Yes" },
    { districtName: "Asifabad", mandalName: "ASIFABAD", sectorName: "ASIFABAD", awcCode: "01010139", awcName: "Tumpalli (01010139)", awcOpen: "Yes", childrenEnrolled: "11", childrenAttended: "10", morningSnackGiven: "10", hcmGiven: "10", ecceConducted: "Yes", imageCaptured: "Yes" },
    { districtName: "Asifabad", mandalName: "ASIFABAD", sectorName: "ASIFABAD", awcCode: "01010103", awcName: "Appapally (01010103)", awcOpen: "Yes", childrenEnrolled: "18", childrenAttended: "16", morningSnackGiven: "16", hcmGiven: "16", ecceConducted: "Yes", imageCaptured: "Yes" }
];


// --- ENHANCED CASCADING FILTERS COMPONENT ---

const divisionOptions = [...new Set(locationMapping.map(item => item.division))];

const ReportFilters = ({
  onFilterChange,
  availableFilters = { division: true, mandal: true, gp: true, awc: true }
}) => {
    const [selectedDivision, setSelectedDivision] = useState('all');
    const [mandalOptions, setMandalOptions] = useState([]);
    const [selectedMandal, setSelectedMandal] = useState('all');
    const [gpOptions, setGpOptions] = useState([]);
    const [selectedGp, setSelectedGp] = useState('all');
    const [awcOptions, setAwcOptions] = useState([]);
    const [selectedAwc, setSelectedAwc] = useState('all');

    // Update mandal options
    useEffect(() => {
        const mandals = selectedDivision === 'all' ? [] : [...new Set(locationMapping.filter(item => item.division === selectedDivision).map(item => item.mandal))];
        setMandalOptions(mandals);
        setSelectedMandal('all');
    }, [selectedDivision]);

    // Update GP options
    useEffect(() => {
        const panchayats = selectedMandal === 'all' ? [] : [...new Set(locationMapping.filter(item => item.mandal === selectedMandal).map(item => item.panchayat))];
        setGpOptions(panchayats);
        setSelectedGp('all');
    }, [selectedMandal]);

    // Update AWC options
    useEffect(() => {
        const awcs = selectedGp === 'all' ? [] : [...new Set(locationMapping.filter(item => item.panchayat === selectedGp).map(item => item.awc))];
        setAwcOptions(awcs);
        setSelectedAwc('all');
    }, [selectedGp]);

    // Notify parent of changes
    useEffect(() => {
        onFilterChange({ division: selectedDivision, mandal: selectedMandal, gp: selectedGp, awc: selectedAwc });
    }, [selectedDivision, selectedMandal, selectedGp, selectedAwc, onFilterChange]);
    
    return (
        <Card className="mb-6 bg-muted/30">
            <CardContent className="p-4 flex flex-wrap items-end gap-4">
                {availableFilters.division && (
                    <div className="flex flex-col">
                        <label className="text-xs font-medium text-muted-foreground mb-1">Division</label>
                        <select value={selectedDivision} onChange={(e) => setSelectedDivision(e.target.value)} className="block w-full min-w-[160px] p-2 border rounded-md shadow-sm text-sm">
                            <option value="all">All Divisions</option>
                            {divisionOptions.map((item, index) => <option key={index} value={item}>{item}</option>)}
                        </select>
                    </div>
                )}
                {availableFilters.mandal && (
                    <div className="flex flex-col">
                        <label className="text-xs font-medium text-muted-foreground mb-1">Mandal</label>
                        <select value={selectedMandal} onChange={(e) => setSelectedMandal(e.target.value)} className="block w-full min-w-[160px] p-2 border rounded-md shadow-sm text-sm" disabled={mandalOptions.length === 0}>
                            <option value="all">All Mandals</option>
                            {mandalOptions.map((item, index) => <option key={index} value={item}>{item}</option>)}
                        </select>
                    </div>
                )}
                {availableFilters.gp && (
                     <div className="flex flex-col">
                        <label className="text-xs font-medium text-muted-foreground mb-1">Gram Panchayat</label>
                        <select value={selectedGp} onChange={(e) => setSelectedGp(e.target.value)} className="block w-full min-w-[160px] p-2 border rounded-md shadow-sm text-sm" disabled={gpOptions.length === 0}>
                            <option value="all">All GPs</option>
                            {gpOptions.map((item, index) => <option key={index} value={item}>{item}</option>)}
                        </select>
                    </div>
                )}
                {availableFilters.awc && (
                     <div className="flex flex-col">
                        <label className="text-xs font-medium text-muted-foreground mb-1">Anganwadi Center</label>
                        <select value={selectedAwc} onChange={(e) => setSelectedAwc(e.target.value)} className="block w-full min-w-[160px] p-2 border rounded-md shadow-sm text-sm" disabled={awcOptions.length === 0}>
                            <option value="all">All AWCs</option>
                            {awcOptions.map((item, index) => <option key={index} value={item}>{item}</option>)}
                        </select>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};


// --- UPDATED REPORT TAB COMPONENTS ---

// 1. FCR Report Tab (Filters by Division and Mandal)
export const FCRReportTab = () => {
    const [filters, setFilters] = useState({ division: 'all', mandal: 'all', gp: 'all', awc: 'all' });
    const [filteredData, setFilteredData] = useState(fcrReportData);

    useEffect(() => {
        let data = fcrReportData;
        if (filters.mandal !== 'all') {
            data = data.filter(row => row.mandalName.toUpperCase() === filters.mandal.toUpperCase());
        } else if (filters.division !== 'all') {
            const mandalsInDivision = [...new Set(locationMapping.filter(item => item.division === filters.division).map(item => item.mandal.toUpperCase()))];
            data = data.filter(row => mandalsInDivision.includes(row.mandalName.toUpperCase()));
        }
        setFilteredData(data);
    }, [filters]);

    return (
        <div className="space-y-6">
            <ReportFilters onFilterChange={setFilters} availableFilters={{ division: true, mandal: true, gp: false, awc: false }} />
            <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><Package className="h-5 w-5 text-blue-600" /> Food Consolidation Report</CardTitle></CardHeader>
                <CardContent className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                        <thead>
                            <tr className="border-b bg-muted/50">
                                {fcrReportData.length > 0 && Object.keys(fcrReportData[0]).map(key => <th key={key} className="text-left p-3 font-semibold whitespace-nowrap">{key}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((row, index) => (
                                <tr key={index} className="border-b hover:bg-muted/30">
                                    {Object.values(row).map((value, i) => <td key={i} className="p-3">{String(value)}</td>)}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardContent>
            </Card>
        </div>
    );
};

// 2. PHC Mapping Tab (Filters down to AWC)
export const PHCMappingTab = () => {
    const [filters, setFilters] = useState({ division: 'all', mandal: 'all', gp: 'all', awc: 'all' });
    const [filteredData, setFilteredData] = useState(phcMappingData);

    useEffect(() => {
        let data = phcMappingData;
        if (filters.awc !== 'all') {
            data = data.filter(row => row.awcName === filters.awc);
        } else if (filters.gp !== 'all') {
            data = data.filter(row => row.gpName === filters.gp);
        } else if (filters.mandal !== 'all') {
            data = data.filter(row => row.mandalName === filters.mandal);
        } else if (filters.division !== 'all') {
            const mandalsInDivision = [...new Set(locationMapping.filter(item => item.division === filters.division).map(item => item.mandal))];
            data = data.filter(row => mandalsInDivision.includes(row.mandalName));
        }
        setFilteredData(data);
    }, [filters]);
    
    return (
        <div className="space-y-6">
             <ReportFilters onFilterChange={setFilters} />
            <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><MapPin className="h-5 w-5 text-green-600" /> PHC Mapping Data</CardTitle></CardHeader>
                <CardContent className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                        <thead>
                            <tr className="border-b bg-muted/50">
                                {phcMappingData.length > 0 && Object.keys(phcMappingData[0]).map(key => <th key={key} className="text-left p-3 font-semibold whitespace-nowrap">{key}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((row, index) => (
                                <tr key={index} className="border-b hover:bg-muted/30">
                                    {Object.values(row).map((value, i) => <td key={i} className="p-3">{String(value)}</td>)}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardContent>
            </Card>
        </div>
    );
};


// 3. THR Report Tab (Filters down to AWC)
export const THRReportTab = () => {
    const [filters, setFilters] = useState({ division: 'all', mandal: 'all', gp: 'all', awc: 'all' });
    const [filteredData, setFilteredData] = useState(thrReportData);

    useEffect(() => {
        let data = thrReportData;
        if (filters.awc !== 'all') {
            data = data.filter(row => row.awcName === filters.awc);
        } else if (filters.gp !== 'all') {
            const awcsInGp = [...new Set(locationMapping.filter(item => item.panchayat === filters.gp).map(item => item.awc))];
            data = data.filter(row => awcsInGp.includes(row.awcName));
        } else if (filters.mandal !== 'all') {
            data = data.filter(row => row.mandalName === filters.mandal);
        }
        setFilteredData(data);
    }, [filters]);

    return (
        <div className="space-y-6">
            <ReportFilters onFilterChange={setFilters} />
            <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><Heart className="h-5 w-5 text-red-600" /> Take Home Ration (THR) Report</CardTitle></CardHeader>
                <CardContent className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                        <thead>
                            <tr className="border-b bg-muted/50">
                               <th className="p-3 text-left font-semibold">Mandal</th>
                               <th className="p-3 text-left font-semibold">AWC Name</th>
                               <th className="p-3 text-center font-semibold">Children (7m-3y)</th>
                               <th className="p-3 text-center font-semibold">Children (3-6y)</th>
                               <th className="p-3 text-center font-semibold">Pregnant Women</th>
                               <th className="p-3 text-center font-semibold">Lactating Mothers</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((row, index) => (
                                <tr key={index} className="border-b hover:bg-muted/30">
                                    <td className="p-3">{row.mandalName}</td>
                                    <td className="p-3">{row.awcName}</td>
                                    <td className="p-3 text-center">{`${row.children7m3yGiven} / ${row.children7m3yTotal}`}</td>
                                    <td className="p-3 text-center">{`${row.children3y6yGiven} / ${row.children3y6yTotal}`}</td>
                                    <td className="p-3 text-center">{`${row.pregWomenGiven} / ${row.pregWomenTotal}`}</td>
                                    <td className="p-3 text-center">{`${row.lacMothersGiven} / ${row.lacMothersTotal}`}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardContent>
            </Card>
        </div>
    );
};

// 4. Utilization Report Tab (Filters down to AWC)
export const UtilizationReportTab = () => {
    const [filters, setFilters] = useState({ division: 'all', mandal: 'all', gp: 'all', awc: 'all' });
    const [filteredData, setFilteredData] = useState(utilizationReportData);

    useEffect(() => {
        let data = utilizationReportData;
        if (filters.awc !== 'all') {
            data = data.filter(row => row.awcName === filters.awc);
        } else if (filters.gp !== 'all') {
            const awcsInGp = [...new Set(locationMapping.filter(item => item.panchayat === filters.gp).map(item => item.awc))];
            data = data.filter(row => awcsInGp.includes(row.awcName));
        } else if (filters.mandal !== 'all') {
            data = data.filter(row => row.mandalName === filters.mandal);
        }
        setFilteredData(data);
    }, [filters]);

    return (
        <div className="space-y-6">
            <ReportFilters onFilterChange={setFilters}/>
            <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><BarChart3 className="h-5 w-5 text-purple-600" /> AWC Utilization Report</CardTitle></CardHeader>
                <CardContent className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                       <thead>
                            <tr className="border-b bg-muted/50">
                                <th className="p-3 text-left font-semibold">Mandal</th>
                                <th className="p-3 text-left font-semibold">AWC Name</th>
                                <th className="p-3 text-center font-semibold">AWC Open</th>
                                <th className="p-3 text-center font-semibold">Attendance</th>
                                <th className="p-3 text-center font-semibold">Morning Snack</th>
                                <th className="p-3 text-center font-semibold">HCM Given</th>
                                <th className="p-3 text-center font-semibold">ECCE</th>
                                <th className="p-3 text-center font-semibold">Image Captured</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((row, index) => (
                                <tr key={index} className="border-b hover:bg-muted/30">
                                    <td className="p-3">{row.mandalName}</td>
                                    <td className="p-3">{row.awcName}</td>
                                    <td className="p-3 text-center">{row.awcOpen}</td>
                                    <td className="p-3 text-center">{row.childrenAttended}</td>
                                    <td className="p-3 text-center">{row.morningSnackGiven}</td>
                                    <td className="p-3 text-center">{row.hcmGiven}</td>
                                    <td className="p-3 text-center">{row.ecceConducted}</td>
                                    <td className="p-3 text-center">{row.imageCaptured}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardContent>
            </Card>
        </div>
    );
};