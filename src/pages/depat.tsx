import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronRight, Briefcase, BarChart3, FileText, CalendarIcon, TrendingUp, TrendingDown, MapPin, Package, CheckSquare, Users, Baby, ShieldCheck, Activity, Target, PregnantWoman, Breastfeeding, ChildFriendly, ChildCare, Scale, Ruler, HeartPulse, HeartHalf, Home, CalendarCheck, DoorOpen, MapPinOff, DoorClosed, UserCheck, Coffee, Utensils, Camera, GraduationCap, Heart } from 'lucide-react';

// --- NEW: Detailed Poshan Data structured by Mandal (extracted from PDFs) ---
// This object centralizes the granular data available from your PDF sources.
// 'all' key represents the overall district totals from the NITI Aayog report (April 2025)
// and Screenshot (133) (May 2025 totals), unless specified otherwise.
const detailedPoshanDataByMandal = {
  // District Totals (primarily from NITI Aayog Report April 2025 and Screenshot 133 May 2025 totals)
  'all': {
    // From NITI Aayog Report April 2025
    underweightChildrenPercentage: 9.37, //
    stuntedChildrenPercentage: 12.13, //
    samChildrenPercentage: 0.54, //
    mamChildrenPercentage: 2.53, //
    awcOwnBuildingPercentage: 36.38, //
    awcConductedVHSNDPercentage: 100.00, //
    // From Screenshot 133 May 2025 Totals
    totalAWCOpen: 782, //
    awcOpenedOutsideFencedArea: 596, //
    awcDidntOpen: 191, //
    totalChildren3YrTo6Yr: 21351, //
    totalChildrenAttended: 8007, //
    morningSnackGiven: 7856, //
    totalHCMGiven: 7003, //
    imageCaptured: 23, //
    noOfAWcCompletedECCE: 791, //
  },
  // Mandal Specific Data from Screenshot 133 (May 2025 Daily Monitoring) and NITI Aayog (April 2025)
  'asifabad-m': { // Using mandal id 'asifabad-m' from your `mandals` array
    totalAWCOpen: 223, //
    awcOpenedOutsideFencedArea: 170, //
    awcDidntOpen: 37, //
    totalChildren3YrTo6Yr: 4268, //
    totalChildrenAttended: 1456, //
    morningSnackGiven: 1424, //
    totalHCMGiven: 1601, //
    imageCaptured: 4, //
    noOfAWcCompletedECCE: 225, //
    underweightChildrenPercentage: 13, // (from NITI Aayog report, 'Asifsbad Total' column)
  },
  'jainoor-m': { // Using mandal id 'jainoor-m'
    totalAWCOpen: 127, //
    awcOpenedOutsideFencedArea: 98, //
    awcDidntOpen: 48, //
    totalChildren3YrTo6Yr: 3282, //
    totalChildrenAttended: 1281, //
    morningSnackGiven: 1278, //
    totalHCMGiven: 964, //
    imageCaptured: 0, //
    noOfAWcCompletedECCE: 127, //
    underweightChildrenPercentage: 3.78, // (from NITI Aayog report, 'Tirtal' column, assuming Tirtal relates to Jainoor block for this metric)
  },
  'kagaznagar-m': { // Using mandal id 'kagaznagar-m'
    totalAWCOpen: 148, //
    awcOpenedOutsideFencedArea: 115, //
    awcDidntOpen: 25, //
    totalChildren3YrTo6Yr: 4656, //
    totalChildrenAttended: 1059, //
    morningSnackGiven: 1059, //
    totalHCMGiven: 874, //
    imageCaptured: 3, //
    noOfAWcCompletedECCE: 153, //
    // No explicit underweight percentage found in NITI Aayog for Kagaznagar in the same table as others
  },
  'sirpur-t-m': { // Using mandal id 'sirpur-t-m' (Sirpur-T in NITI Ayog)
    totalAWCOpen: 186, //
    awcOpenedOutsideFencedArea: 138, //
    awcDidntOpen: 16, //
    totalChildren3YrTo6Yr: 5440, //
    totalChildrenAttended: 2358, //
    morningSnackGiven: 2326, //
    totalHCMGiven: 2455, //
    imageCaptured: 16, //
    noOfAWcCompletedECCE: 188, //
    underweightChildrenPercentage: 13.52, //
  },
  'wankidi-m': { // Using mandal id 'wankidi-m'
    totalAWCOpen: 88, //
    awcOpenedOutsideFencedArea: 75, //
    awcDidntOpen: 85, //
    totalChildren3YrTo6Yr: 3705, //
    totalChildrenAttended: 1852, //
    morningSnackGiven: 1769, //
    totalHCMGiven: 1109, //
    imageCaptured: 0, //
    noOfAWcCompletedECCE: 98, //
    underweightChildrenPercentage: 5.28, //
  },
  // Add other mandals here if you have specific data for them in future documents.
  // If a mandal is selected for which no specific data is provided above,
  // the component will fall back to 'all' (district totals).
};

// Simulated FCR data based on the Excel structure
const fcrData = [
  { slNo: 1, district: "KB Asifabad", name: "ASIFABAD", totalAWCs: 260, awcsReported: 260, riceOpening: 20252.472, riceReceived: 12950, riceUtilized: 12260.963 },
  { slNo: 2, district: "KB Asifabad", name: "JAINOOR", totalAWCs: 175, awcsReported: 175, riceOpening: 14067.419, riceReceived: 9550, riceUtilized: 10550.834 },
  { slNo: 3, district: "KB Asifabad", name: "KAGAZNAGAR", totalAWCs: 180, awcsReported: 180, riceOpening: 15432.125, riceReceived: 8750, riceUtilized: 11250.450 },
  { slNo: 4, district: "KB Asifabad", name: "SIRPUR", totalAWCs: 195, awcsReported: 195, riceOpening: 18245.875, riceReceived: 10200, riceUtilized: 13150.225 },
  { slNo: 5, district: "KB Asifabad", name: "MANCHERIAL", totalAWCs: 163, awcsReported: 163, riceOpening: 12875.340, riceReceived: 8950, riceUtilized: 9875.680 }
];

// Add these new data structures outside your DepartmentDashboardPage component
const districts = [
  { id: 'kb-asifabad', name: 'Komaram Bheem Asifabad', abbreviation: 'KB A' },
  { id: 'mancherial', name: 'Mancherial', abbreviation: 'MCL' },
  { id: 'nirmal', name: 'Nirmal', abbreviation: 'NML' },
];

// Data for Mandals (Blocks)
const mandals = [
  { id: 'all', name: 'All Mandals', abbreviation: 'ALL' }, // Added 'all' option
  { id: 'asifabad-m', name: 'Asifabad', abbreviation: 'ASF' },
  { id: 'bejjur-m', name: 'Bejjur', abbreviation: 'BJR' },
  { id: 'dahegaon-m', name: 'Dahegaon', abbreviation: 'DHG' },
  { id: 'jainoor-m', name: 'Jainoor', abbreviation: 'JNR' },
  { id: 'kagaznagar-m', name: 'Kagaznagar', abbreviation: 'KZR' },
  { id: 'kerameri-m', name: 'Kerameri', abbreviation: 'KRM' },
  { id: 'kouthala-m', name: 'Kouthala', abbreviation: 'KTL' },
  { id: 'rebbena-m', name: 'Rebbena', abbreviation: 'RBN' },
  { id: 'sirpur-t-m', name: 'Sirpur (T)', abbreviation: 'SPT' },
  { id: 'sirpur-u-m', name: 'Sirpur (U)', abbreviation: 'SPU' },
  { id: 'tiryani-m', name: 'Tiryani', abbreviation: 'TYN' },
  { id: 'wankidi-m', name: 'Wankidi', abbreviation: 'WKD' },
  { id: 'lingapur-m', name: 'Lingapur', abbreviation: 'LGP' },
  { id: 'penchicalpet-m', name: 'Penchicalpet', abbreviation: 'PCP' },
  { id: 'chintalamanepally-m', name: 'Chintalamanepally', abbreviation: 'CML' },
];

// Data for Municipalities (Divisions)
const municipalities = [
  { id: 'all', name: 'All Municipalities', abbreviation: 'ALL' }, // Added 'all' option
  { id: 'm-asifabad', name: 'Asifabad Municipality', abbreviation: 'ASIF' },
  { id: 'm-kagaznagar', name: 'Kagaznagar Municipality', abbreviation: 'KAGA' },
];

// Data for Gram Panchayats (GP)
const gramPanchayats = [
  { id: 'all', name: 'All GPs', abbreviation: 'ALL' }, // Added 'all' option
  { id: 'gp-kosara', name: 'Kosara', abbreviation: 'KSR' },
  { id: 'gp-malangondi', name: 'Malangondi', abbreviation: 'MLG' },
  { id: 'gp-venkatapur', name: 'Venkatapur', abbreviation: 'VNK' },
  { id: 'gp-tumpalli', name: 'Tumpalli', abbreviation: 'TMP' },
  { id: 'gp-appapally', name: 'Appapally', abbreviation: 'APP' },
  { id: 'gp-koutaguda', name: 'Koutaguda', abbreviation: 'KTG' },
  { id: 'gp-chilatiguda', name: 'Chilatiguda', abbreviation: 'CLT' },
  { id: 'gp-motuguda', name: 'Motuguda', abbreviation: 'MTG' },
  { id: 'gp-govindapur', name: 'Govindapur', abbreviation: 'GVP' },
  { id: 'gp-padibanda', name: 'Padibanda', abbreviation: 'PDB' },
  { id: 'gp-manikguda', name: 'Manikguda', abbreviation: 'MNK' },
  { id: 'gp-babapur', name: 'Babapur', abbreviation: 'BBP' },
  { id: 'gp-wavudam', name: 'Wavudam', abbreviation: 'WVD' },
  { id: 'gp-ankusapur', name: 'Ankusapur', abbreviation: 'ANK' },
  { id: 'gp-ada-dasnapur', name: 'Ada Dasnapur', abbreviation: 'ADD' },
  { id: 'gp-gundi', name: 'Gundi', abbreviation: 'GND' },
  { id: 'gp-yellaram', name: 'Yellaram', abbreviation: 'YLR' },
  { id: 'gp-routsankepalle', name: 'Routsankepalle', abbreviation: 'RSP' },
  { id: 'gp-buruguda', name: 'Buruguda', abbreviation: 'BRG' },
  { id: 'gp-mowad', name: 'Mowad', abbreviation: 'MWD' },
  { id: 'gp-ada', name: 'Ada', abbreviation: 'ADA' },
  { id: 'gp-chirrakunta', name: 'Chirrakunta', abbreviation: 'CRK' },
  { id: 'gp-asifabad-municipality', name: 'Asifabad (municipality)', abbreviation: 'ASIF' },
  { id: 'gp-chorpalli', name: 'Chorpalli', abbreviation: 'CRP' }, // Renamed to avoid id conflict
  { id: 'gp-edulawada', name: 'Edulawada', abbreviation: 'EDL' },
  { id: 'gp-rahapally', name: 'Rahapally', abbreviation: 'RHP' },
  { id: 'gp-saleguda', name: 'Saleguda', abbreviation: 'SLG' },
  { id: 'gp-andhugulaguda', name: 'Andhugulaguda', abbreviation: 'ADG' },
  { id: 'gp-outsarangipalle', name: 'Outsarangipalle', abbreviation: 'OSP' },
  { id: 'gp-kukuda', name: 'Kukuda', abbreviation: 'KKD' },
  { id: 'gp-pothepally', name: 'Pothepally', abbreviation: 'PTP' },
  { id: 'gp-kushnepalle', name: 'Kushnepalle', abbreviation: 'KNP' },
  { id: 'gp-kuntalamanepalli', name: 'Kuntalamanepalli', abbreviation: 'KML' },
  { id: 'gp-mogavelly', name: 'Mogavelly', abbreviation: 'MGV' },
  { id: 'gp-rebbena', name: 'Rebbena', abbreviation: 'RBN' },
  { id: 'gp-sushmir', name: 'Sushmir', abbreviation: 'SMR' },
  { id: 'gp-somini', name: 'Somini', abbreviation: 'SMN' },
  { id: 'gp-ambhaghat', name: 'Ambhaghat', abbreviation: 'ABG' },
  { id: 'gp-thummalaguda', name: 'Thummalaguda', abbreviation: 'TMG' },
  { id: 'gp-talai', name: 'Talai', abbreviation: 'TLI' },
  { id: 'gp-bareguda', name: 'Bareguda', abbreviation: 'BRG' },
  { id: 'gp-katepalli', name: 'Katepalli', abbreviation: 'KTP' },
  { id: 'gp-marthadi', name: 'Marthadi', abbreviation: 'MTH' },
  { id: 'gp-bejjur', name: 'Bejjur', abbreviation: 'BJR' },
  { id: 'gp-munjampalle', name: 'Munjampalle', abbreviation: 'MJP' },
  { id: 'gp-papanpet', name: 'Papanpet', abbreviation: 'PPT' },
  { id: 'gp-sulugupalli', name: 'Sulugupalli', abbreviation: 'SLP' },
  { id: 'gp-pedda-siddapur', name: 'Pedda Siddapur', abbreviation: 'PSP' },
  { id: 'gp-lambadiguda', name: 'Lambadiguda', abbreviation: 'LBG' },
  { id: 'gp-chinnaraspalle', name: 'Chinnaraspalle', abbreviation: 'CRP' },
  { id: 'gp-borlakunta', name: 'Borlakunta', abbreviation: 'BLK' },
  { id: 'gp-kothmir', name: 'Kothmir', abbreviation: 'KTM' },
  { id: 'gp-pesarikunta', name: 'Pesarikunta', abbreviation: 'PSK' },
  { id: 'gp-digida', name: 'Digida', abbreviation: 'DGD' },
  { id: 'gp-dahegaon', name: 'Dahegaon', abbreviation: 'DHG' },
  { id: 'gp-chandrapalle', name: 'Chandrapalle', abbreviation: 'CDP' },
  { id: 'gp-rampur', name: 'Rampur', abbreviation: 'RMP' },
  { id: 'gp-motleguda', name: 'Motleguda', abbreviation: 'MTL' },
  { id: 'gp-kamarpally', name: 'Kamarpally', abbreviation: 'KMP' },
  { id: 'gp-gerre', name: 'Gerre', abbreviation: 'GRR' },
  { id: 'gp-kalwada', name: 'Kalwada', abbreviation: 'KLW' },
  { id: 'gp-laggaon', name: 'Laggaon', abbreviation: 'LGN' },
  { id: 'gp-ainam', name: 'Ainam', abbreviation: 'AIN' },
  { id: 'gp-vodduguda', name: 'Vodduguda', abbreviation: 'VDG' },
  { id: 'gp-hathni', name: 'Hathni', abbreviation: 'HTN' },
  { id: 'gp-kunchavelli', name: 'Kunchavelli', abbreviation: 'KCV' },
  { id: 'gp-chowka', name: 'Chowka', abbreviation: 'CWK' },
  { id: 'gp-beebra', name: 'Beebra', abbreviation: 'BBR' },
  { id: 'gp-pp-rao-colony', name: 'PP Rao Colony', abbreviation: 'PPRC' },
  { id: 'gp-ityal', name: 'Ityal', abbreviation: 'ITY' },
  { id: 'gp-kharji', name: 'Kharji', abbreviation: 'KHJ' },
  { id: 'gp-girvelli', name: 'Girvelli', abbreviation: 'GRV' },
  { id: 'gp-bhamanagar', name: 'Bhamanagar', abbreviation: 'BMN' },
  { id: 'gp-pocham-loddi', name: 'Pocham Loddi', abbreviation: 'PCL' },
  { id: 'gp-raoji-guda', name: 'Raoji Guda', abbreviation: 'RJG' },
  { id: 'gp-dubbaguda', name: 'Dubbaguda', abbreviation: 'DBG' },
  { id: 'gp-ushegaon', name: 'Ushegaon', abbreviation: 'USG' },
  { id: 'gp-power-guda', name: 'Power Guda', abbreviation: 'PWG' },
  { id: 'gp-andh-guda', name: 'Andh Guda', abbreviation: 'ADG' },
  { id: 'gp-maniguda', name: 'Maniguda', abbreviation: 'MNG' },
  { id: 'gp-panapatar', name: 'Panapatar', abbreviation: 'PPT' },
  { id: 'gp-jamni', name: 'Jamni', abbreviation: 'JMN' },
  { id: 'gp-para', name: 'Para', abbreviation: 'PAR' },
  { id: 'gp-chinthakara', name: 'Chinthakara', abbreviation: 'CHK' },
  { id: 'gp-rasimatta', name: 'Rasimatta', abbreviation: 'RSM' },
  { id: 'gp-gudamamda', name: 'Gudamamda', abbreviation: 'GDM' },
  { id: 'gp-bhusimetta', name: 'Bhusimetta', abbreviation: 'BHS' },
  { id: 'gp-gowri-kolamguda', name: 'Gowri Kolamguda', abbreviation: 'GKG' },
  { id: 'gp-shivnoor', name: 'Shivnoor', abbreviation: 'SVN' },
  { id: 'gp-addesara', name: 'Addesara', abbreviation: 'ADS' },
  { id: 'gp-daboli', name: 'Daboli', abbreviation: 'DBL' },
  { id: 'gp-ashapalle', name: 'Ashapalle', abbreviation: 'ASP' },
  { id: 'gp-jamgaon', name: 'Jamgaon', abbreviation: 'JMG' },
  { id: 'gp-patnapur', name: 'Patnapur', abbreviation: 'PTP' },
  { id: 'gp-mankuguda', name: 'Mankuguda', abbreviation: 'MKG' },
  { id: 'gp-jainoor', name: 'Jainoor', abbreviation: 'JNR' },
  { id: 'gp-ramnayak-thanda', name: 'Ramnayak Thanda', abbreviation: 'RNT' },
  { id: 'gp-marlawai', name: 'Marlawai', abbreviation: 'MLW' },
  { id: 'gp-jandaguda', name: 'Jandaguda', abbreviation: 'JDG' },
  { id: 'gp-nazurulnagar', name: 'Nazurulnagar', abbreviation: 'NZR' },
  { id: 'gp-kadamba', name: 'Kadamba', abbreviation: 'KDB' },
  { id: 'gp-mosam', name: 'Mosam', abbreviation: 'MSM' },
  { id: 'gp-ramnagar-n', name: 'Ramnagar (N)', abbreviation: 'RMN' },
  { id: 'gp-jaganathpur', name: 'Jaganathpur', abbreviation: 'JNP' },
  { id: 'gp-lineguda', name: 'Lineguda', abbreviation: 'LNG' },
  { id: 'gp-basantinagar', name: 'Basantinagar', abbreviation: 'BSN' },
  { id: 'gp-ankoda', name: 'Ankoda', abbreviation: 'AKD' },
  { id: 'gp-vallakonda', name: 'Vallakonda', abbreviation: 'VLK' },
  { id: 'gp-burdagudem', name: 'Burdagudem', abbreviation: 'BDG' },
  { id: 'gp-regulaguda', name: 'Regulaguda', abbreviation: 'RGG' },
  { id: 'gp-ngos-colony', name: 'NGOs Colony', abbreviation: 'NGC' },
  { id: 'gp-easgaon', name: 'Easgaon', abbreviation: 'ESG' },
  { id: 'gp-andevelly', name: 'Andevelly', abbreviation: 'ADV' },
  { id: 'gp-chinthaguda-koyawagu', name: 'Chinthaguda Koyawagu', abbreviation: 'CGK' },
  { id: 'gp-kotha-sarsala', name: 'Kotha Sarsala', abbreviation: 'KSR' },
  { id: 'gp-gannaram', name: 'Gannaram', abbreviation: 'GNR' },
  { id: 'gp-raspally', name: 'Raspally', abbreviation: 'RSP' },
  { id: 'gp-nagampet', name: 'Nagampet', abbreviation: 'NGP' },
  { id: 'gp-bodepalle', name: 'Bodepalle', abbreviation: 'BDP' },
  { id: 'gp-bhat-palle', name: 'Bhat Palle', abbreviation: 'BHP' },
  { id: 'gp-chinthaguda', name: 'Chinthaguda', abbreviation: 'CHG' },
  { id: 'gp-vanjari', name: 'Vanjari', abbreviation: 'VNJ' },
  { id: 'gp-durga-nagar', name: 'Durga Nagar', abbreviation: 'DGN' },
  { id: 'gp-kosini', name: 'Kosini', abbreviation: 'KSN' },
  { id: 'gp-malni', name: 'Malni', abbreviation: 'MLN' },
  { id: 'gp-metapipri', name: 'Metapipri', abbreviation: 'MTP' },
  { id: 'gp-ananthapur', name: 'Ananthapur', abbreviation: 'ATP' },
  { id: 'gp-bolapatar', name: 'Bolapatar', abbreviation: 'BLP' },
  { id: 'gp-jhari', name: 'Jhari', abbreviation: 'JHR' },
  { id: 'gp-keslaguda', name: 'Keslaguda', abbreviation: 'KSG' },
  { id: 'gp-keli-b', name: 'Keli-B', abbreviation: 'KLB' },
  { id: 'gp-modi', name: 'Modi', abbreviation: 'MOD' },
  { id: 'gp-indapur', name: 'Indapur', abbreviation: 'INP' },
  { id: 'gp-kothari', name: 'Kothari', abbreviation: 'KTR' },
  { id: 'gp-gondguda', name: 'Gondguda', abbreviation: 'GDG' },
  { id: 'gp-agarwada', name: 'Agarwada', abbreviation: 'AGW' },
  { id: 'gp-ringhanghat', name: 'Ringhanghat', abbreviation: 'RHG' },
  { id: 'gp-babejhari', name: 'Babejhari', abbreviation: 'BBS' },
  { id: 'gp-devapur', name: 'Devapur', abbreviation: 'DVP' },
  { id: 'gp-karanjiwada', name: 'Karanjiwada', abbreviation: 'KJW' },
  { id: 'gp-dhanora', name: 'Dhanora', abbreviation: 'DNR' },
  { id: 'gp-parda', name: 'Parda', abbreviation: 'PRD' },
  { id: 'gp-mukadhamguda', name: 'Mukadhamguda', abbreviation: 'MKG' },
  { id: 'gp-saverkeda', name: 'Saverkeda', abbreviation: 'SVK' },
  { id: 'gp-sakada', name: 'Sakada', abbreviation: 'SKD' },
  { id: 'gp-jhodeghat', name: 'Jhodeghat', abbreviation: 'JHG' },
  { id: 'gp-goyagaon', name: 'Goyagaon', abbreviation: 'GYG' },
  { id: 'gp-kerameri', name: 'Kerameri', abbreviation: 'KRM' },
  { id: 'gp-sangvi', name: 'Sangvi', abbreviation: 'SNV' },
  { id: 'gp-nishani', name: 'Nishani', abbreviation: 'NSN' },
  { id: 'gp-parandholi', name: 'Parandholi', abbreviation: 'PRH' },
  { id: 'gp-borilalguda', name: 'Borilalguda', abbreviation: 'BLG' },
  { id: 'gp-anarpalli', name: 'Anarpalli', abbreviation: 'ANP' },
  { id: 'gp-thummaguda', name: 'Thummaguda', abbreviation: 'TMG' },
  { id: 'gp-khairi', name: 'Khairi', abbreviation: 'KHR' },
  { id: 'gp-surdapur', name: 'Surdapur', abbreviation: 'SDP' },
  { id: 'gp-kannepalle', name: 'Kannepalle', abbreviation: 'KNP' },
  { id: 'gp-thatipally', name: 'Thatipally', abbreviation: 'THP' },
  { id: 'gp-thatinagar', name: 'Thatinagar', abbreviation: 'THT' },
  { id: 'gp-veerdandi', name: 'Veerdandi', abbreviation: 'VRD' },
  { id: 'gp-sandgoan', name: 'Sandgoan', abbreviation: 'SDG' },
  { id: 'gp-mogadhagad', name: 'Mogadhagad', abbreviation: 'MGD' },
  { id: 'gp-bodhampalli', name: 'Bodhampalli', abbreviation: 'BDP' },
  { id: 'gp-kanki', name: 'Kanki', abbreviation: 'KNK' },
  { id: 'gp-tumdihetty', name: 'Tumdihetty', abbreviation: 'TDH' },
  { id: 'gp-veeravelly', name: 'Veeravelly', abbreviation: 'VRV' },
  { id: 'gp-nagepalli', name: 'Nagepalli', abbreviation: 'NGP' },
  { id: 'gp-kouthala', name: 'Kouthala', abbreviation: 'KTL' },
  { id: 'gp-muthampet', name: 'Muthampet', abbreviation: 'MTP' },
  { id: 'gp-gundaipeta', name: 'Gundaipeta', abbreviation: 'GDP' },
  { id: 'gp-gurudpeta', name: 'Gurudpeta', abbreviation: 'GRP' },
  { id: 'gp-gudlabori', name: 'Gudlabori', abbreviation: 'GDB' },
  { id: 'gp-talodi', name: 'Talodi', abbreviation: 'TLD' },
  { id: 'gp-bhalepalli', name: 'Bhalepalli', abbreviation: 'BHL' },
  { id: 'gp-pardi', name: 'Pardi', abbreviation: 'PRD' },
  { id: 'gp-shirsha', name: 'Shirsha', abbreviation: 'SRS' },
  { id: 'gp-navegaon', name: 'Navegaon', abbreviation: 'NVG' },
  { id: 'gp-rollapahad', name: 'Rollapahad', abbreviation: 'RLP' },
  { id: 'gp-rajaram', name: 'Rajaram', abbreviation: 'RJR' },
  { id: 'gp-khairgaon', name: 'Khairgaon', abbreviation: 'KRG' },
  { id: 'gp-indranagar', name: 'Indranagar', abbreviation: 'IDN' },
  { id: 'gp-golleti', name: 'Golleti', abbreviation: 'GLT' },
  { id: 'gp-jakkulapally', name: 'Jakkulapally', abbreviation: 'JKP' },
  { id: 'gp-pasigaon', name: 'Pasigaon', abbreviation: 'PSGN' },
  { id: 'gp-kondapalle', name: 'Kondapalle', abbreviation: 'KDP' },
  { id: 'gp-pulikunta', name: 'Pulikunta', abbreviation: 'PLK' },
  { id: 'gp-laxmipur', name: 'Laxmipur', abbreviation: 'LXP' },
  { id: 'gp-dharmaram', name: 'Dharmaram', abbreviation: 'DHR' },
  { id: 'gp-madavaiguda', name: 'Madavaiguda', abbreviation: 'MDG' },
  { id: 'gp-takkallapalle', name: 'Takkallapalle', abbreviation: 'TKP' },
  { id: 'gp-komuravelly', name: 'Komuravelly', abbreviation: 'KMV' },
  { id: 'gp-tungeda', name: 'Tungeda', abbreviation: 'TNG' },
  { id: 'gp-venkulam', name: 'Venkulam', abbreviation: 'VNK' },
  { id: 'gp-nambal', name: 'Nambal', abbreviation: 'NBL' },
  { id: 'gp-rebbana', name: 'Rebbana', abbreviation: 'RBN' },
  { id: 'gp-gangapur', name: 'Gangapur', abbreviation: 'GNG' },
  { id: 'gp-narayanpur', name: 'Narayanpur', abbreviation: 'NRP' },
  { id: 'gp-kistapur', name: 'Kistapur', abbreviation: 'KST' },
  { id: 'gp-khairguda', name: 'Khairguda', abbreviation: 'KGD' },
  { id: 'gp-itikyalapahad', name: 'Itikyalapahad', abbreviation: 'ITP' },
  { id: 'gp-karjepally', name: 'Karjepally', abbreviation: 'KJP' },
  { id: 'gp-vempalle', name: 'Vempalle', abbreviation: 'VMP' },
  { id: 'gp-parigaon', name: 'Parigaon', abbreviation: 'PRG' },
  { id: 'gp-achelly', name: 'Achelly', abbreviation: 'ACL' },
  { id: 'gp-chintakunta', name: 'Chintakunta', abbreviation: 'CKT' },
  { id: 'gp-loanvelli', name: 'Loanvelli', abbreviation: 'LNV' },
  { id: 'gp-medipally', name: 'Medipally', abbreviation: 'MDP' },
  { id: 'gp-dhorpalle', name: 'Dhorpalle', abbreviation: 'DHP' },
  { id: 'gp-venkatraopet', name: 'Venkatraopet', abbreviation: 'VRP' },
  { id: 'gp-sirpur-t', name: 'Sirpur (T)', abbreviation: 'SPT' },
  { id: 'gp-navegoan', name: 'Navegoan', abbreviation: 'NVG' },
  { id: 'gp-hudkili', name: 'Hudkili', abbreviation: 'HDK' },
  { id: 'gp-cheelapalle', name: 'Cheelapalle', abbreviation: 'CHP' },
  { id: 'gp-bhupalapatnam', name: 'Bhupalapatnam', abbreviation: 'BPL' },
  { id: 'gp-bandair', name: 'Bandair', abbreviation: 'BND' },
  { id: 'gp-shettihadapnur', name: 'Shettihadapnur', abbreviation: 'SHP' },
  { id: 'gp-pamulawada', name: 'Pamulawada', abbreviation: 'PMW' },
  { id: 'gp-burnoor-b', name: 'Burnoor-B', abbreviation: 'BNB' },
  { id: 'gp-raghapur', name: 'Raghapur', abbreviation: 'RGP' },
  { id: 'gp-dhanora-p', name: 'Dhanora-P', abbreviation: 'DNP' },
  { id: 'gp-powarguda', name: 'Powarguda', abbreviation: 'PWG' },
  { id: 'gp-pangidi', name: 'Pangidi', abbreviation: 'PGD' },
  { id: 'gp-phullara', name: 'Phullara', abbreviation: 'PHL' },
  { id: 'gp-kohinoor-b', name: 'Kohinoor-B', abbreviation: 'KHB' },
  { id: 'gp-seethagondi', name: 'Seethagondi', abbreviation: 'STG' },
  { id: 'gp-babjipet', name: 'Babjipet', abbreviation: 'BJP' },
  { id: 'gp-netnoor', name: 'Netnoor', abbreviation: 'NTR' },
  { id: 'gp-mahagaon', name: 'Mahagaon', abbreviation: 'MHG' },
  { id: 'gp-sirpur-u', name: 'Sirpur (U)', abbreviation: 'SPU' },
  { id: 'gp-mandaguda', name: 'Mandaguda', abbreviation: 'MDG' },
  { id: 'gp-chintapally', name: 'Chintapally', abbreviation: 'CHP' },
  { id: 'gp-goperanaguguda', name: 'Goperanaguguda', abbreviation: 'GPG' },
  { id: 'gp-thalandi', name: 'Thalandi', abbreviation: 'TLD' },
  { id: 'gp-govena', name: 'Govena', abbreviation: 'GVN' },
  { id: 'gp-tiryani', name: 'Tiryani', abbreviation: 'TYN' },
  { id: 'gp-mesramguda', name: 'Mesramguda', abbreviation: 'MSG' },
  { id: 'gp-koutagam', name: 'Koutagam', abbreviation: 'KTG' },
  { id: 'gp-ullipitadorli', name: 'Ullipitadorli', abbreviation: 'UPD' },
  { id: 'gp-pangidi-madra', name: 'Pangidi Madra', abbreviation: 'PGM' },
  { id: 'gp-morriguda', name: 'Morriguda', abbreviation: 'MRG' },
  { id: 'gp-gudipet', name: 'Gudipet', abbreviation: 'GDP' },
  { id: 'gp-goyagoan', name: 'Goyagoan', abbreviation: 'GYG' },
  { id: 'gp-markaguda', name: 'Markaguda', abbreviation: 'MKG' },
  { id: 'gp-nayakapuguda', name: 'Nayakapuguda', abbreviation: 'NPG' },
  { id: 'gp-rajaguda', name: 'Rajaguda', abbreviation: 'RJG' },
  { id: 'gp-bheemjiguda', name: 'Bheemjiguda', abbreviation: 'BMJ' },
  { id: 'gp-rompalle', name: 'Rompalle', abbreviation: 'RPL' },
  { id: 'gp-mulkalamanda', name: 'Mulkalamanda', abbreviation: 'MKM' },
  { id: 'gp-khariguda', name: 'Khariguda', abbreviation: 'KRG' },
  { id: 'gp-godelpalle', name: 'Godelpalle', abbreviation: 'GDP' },
  { id: 'gp-gambiraopet', name: 'Gambiraopet', abbreviation: 'GMB' },
  { id: 'gp-devaiguda', name: 'Devaiguda', abbreviation: 'DVG' },
  { id: 'gp-edulapahad', name: 'Edulapahad', abbreviation: 'EDP' },
  { id: 'gp-manikyapur', name: 'Manikyapur', abbreviation: 'MNK' },
  { id: 'gp-sungapur', name: 'Sungapur', abbreviation: 'SNG' },
  { id: 'gp-ginnedari', name: 'Ginnedari', abbreviation: 'GND' },
  { id: 'gp-mangi', name: 'Mangi', abbreviation: 'MNG' },
  { id: 'gp-samela', name: 'Samela', abbreviation: 'SML' },
  { id: 'gp-bambara', name: 'Bambara', abbreviation: 'BMB' },
  { id: 'gp-komatiguda', name: 'Komatiguda', abbreviation: 'KMG' },
  { id: 'gp-pataguda', name: 'Pataguda', abbreviation: 'PTG' },
  { id: 'gp-sonapur', name: 'Sonapur', abbreviation: 'SNP' },
  { id: 'gp-bendera', name: 'Bendera', abbreviation: 'BND' },
  { id: 'gp-tejapur', name: 'Tejapur', abbreviation: 'TJP' },
  { id: 'gp-chichupally', name: 'Chichupally', abbreviation: 'CCP' },
  { id: 'gp-jambuldhari', name: 'Jambuldhari', abbreviation: 'JBD' },
  { id: 'gp-pippergonadi', name: 'Pippergonadi', abbreviation: 'PPG' },
  { id: 'gp-dabha', name: 'Dabha', abbreviation: 'DBH' },
  { id: 'gp-navedhari', name: 'Navedhari', abbreviation: 'NVD' },
  { id: 'gp-velgi', name: 'Velgi', abbreviation: 'VLG' },
  { id: 'gp-wankidi-kalan', name: 'Wankidi Kalan', abbreviation: 'WKK' },
  { id: 'gp-indhani', name: 'Indhani', abbreviation: 'IDN' },
  { id: 'gp-doddiguda', name: 'Doddiguda', abbreviation: 'DDG' },
  { id: 'gp-jaithpur', name: 'Jaithpur', abbreviation: 'JTP' },
  { id: 'gp-khirdi', name: 'Khirdi', abbreviation: 'KHD' },
  { id: 'gp-sawathi', name: 'Sawathi', abbreviation: 'SWT' },
  { id: 'gp-khamana', name: 'Khamana', abbreviation: 'KMN' },
  { id: 'gp-chowpanguda', name: 'Chowpanguda', abbreviation: 'CPG' },
  { id: 'gp-kanneragaon', name: 'Kanneragaon', abbreviation: 'KNG' },
  { id: 'gp-lendiguda', name: 'Lendiguda', abbreviation: 'LDG' },
  { id: 'gp-naveguda', name: 'Naveguda', abbreviation: 'NVG' },
  { id: 'gp-sarandi', name: 'Sarandi', abbreviation: 'SRN' },
  { id: 'gp-mamidipalli', name: 'Mamidipalli', abbreviation: 'MDP' },
  { id: 'gp-piklathanda', name: 'Piklathanda', abbreviation: 'PKT' },
  { id: 'gp-yellapatar', name: 'Yellapatar', abbreviation: 'YLP' },
  { id: 'gp-pittaguda', name: 'Pittaguda', abbreviation: 'PTG' },
  { id: 'gp-kothapalli', name: 'Kothapalli', abbreviation: 'KTP' },
  { id: 'gp-jamuldhara', name: 'Jamuldhara', abbreviation: 'JMD' },
  { id: 'gp-loddiguda', name: 'Loddiguda', abbreviation: 'LDG' },
  { id: 'gp-gumnoor-b', name: 'Gumnoor-B', abbreviation: 'GNB' },
  { id: 'gp-chinnadampur', name: 'Chinnadampur', abbreviation: 'CDP' },
  { id: 'gp-mothipatar', name: 'Mothipatar', abbreviation: 'MTP' },
  { id: 'gp-keemnayak-tanda', name: 'Keemnayak Tanda', abbreviation: 'KNT' },
  { id: 'gp-chorpalle-lingapur', name: 'Chorpalle', abbreviation: 'CRP' }, // Renamed to avoid id conflict
  { id: 'gp-kanchanpalli', name: 'Kanchanpalli', abbreviation: 'KCP' },
  { id: 'gp-lingapur', name: 'Lingapur', abbreviation: 'LGP' },
  { id: 'gp-yelkapalle', name: 'Yelkapalle', abbreviation: 'YKP' },
  { id: 'gp-darogapally', name: 'Darogapally', abbreviation: 'DRP' },
  { id: 'gp-lodpalle', name: 'Lodpalle', abbreviation: 'LDP' },
  { id: 'gp-pothapalli', name: 'Pothapalli', abbreviation: 'PTP' },
  { id: 'gp-chedvai', name: 'Chedvai', abbreviation: 'CDV' },
  { id: 'gp-penchikalpet', name: 'Penchikalpet', abbreviation: 'PCP' },
  { id: 'gp-yellur', name: 'Yellur', abbreviation: 'YLR' },
  { id: 'gp-kamergaon', name: 'Kamergaon', abbreviation: 'KMG' },
  { id: 'gp-muraliguda', name: 'Muraliguda', abbreviation: 'MLG' },
  { id: 'gp-agarguda', name: 'Agarguda', abbreviation: 'AGG' },
  { id: 'gp-bombaiguda', name: 'Bombaiguda', abbreviation: 'BMG' },
  { id: 'gp-ranvalli', name: 'Ranvalli', abbreviation: 'RNV' },
  { id: 'gp-burepalli', name: 'Burepalli', abbreviation: 'BRP' },
  { id: 'gp-dabba', name: 'Dabba', abbreviation: 'DBB' },
  { id: 'gp-adepally', name: 'Adepally', abbreviation: 'ADP' },
  { id: 'gp-balaji-ankoda', name: 'Balaji Ankoda', abbreviation: 'BJA' },
  { id: 'gp-lamberhetti', name: 'Lamberhetti', abbreviation: 'LBH' },
  { id: 'gp-korsini', name: 'Korsini', abbreviation: 'KRS' },
  { id: 'gp-rudrapur', name: 'Rudrapur', abbreviation: 'RDP' },
  { id: 'gp-ravindranagar-ii', name: 'Ravindranagar-II', abbreviation: 'RN2' },
  { id: 'gp-hetiguda', name: 'Hetiguda', abbreviation: 'HTG' },
  { id: 'gp-babasagar', name: 'Babasagar', abbreviation: 'BBS' },
  { id: 'gp-ravindranagar', name: 'Ravindranagar', abbreviation: 'RNR' },
  { id: 'gp-chintala-manepalle', name: 'Chintala Manepalle', abbreviation: 'CML' },
  { id: 'gp-gudem', name: 'Gudem', abbreviation: 'GDM' },
  { id: 'gp-karjavelli', name: 'Karjavelli', abbreviation: 'KJV' },
  { id: 'gp-dimda', name: 'Dimda', abbreviation: 'DMD' },
  { id: 'gp-koyapally', name: 'Koyapally', abbreviation: 'KYP' },
];

// Re-defining departments to include more dummy department types for the top dropdown
// This is separate from your existing 'departments' array for the main content,
// as the top-level 'Department' dropdown might be a broader category.
// If you want to use the same 'departments' array, let me know, and we can adjust.
const topLevelDepartments = [
  { id: 'all', name: 'All Departments', abbreviation: 'ALL' },
  { id: 'dwo-top', name: 'District Welfare Officer', abbreviation: 'DWO' },
  { id: 'health-top', name: 'Health Department', abbreviation: 'HD' },
  { id: 'education-top', name: 'Education Department', abbreviation: 'ED' },
  { id: 'revenue-top', name: 'Revenue Department', abbreviation: 'RD' },
];

// Enhanced departments with DWO
const departments = [
  { id: 'dwo', name: 'District Welfare Officer', color: 'bg-purple-600', description: 'Dr. Bhasker' },
  { id: 'revenue', name: 'District Revenue Officer /RDO Asifabad', color: 'bg-purple-600', description: 'V. Lokeshwara Rao' },
  { id: 'planning', name: 'Chief Planning Officer', color: 'bg-teal-500', description: 'P. Chinakotya Naik' },
  { id: 'health', name: 'District Medical & Health Officer', color: 'bg-green-500', description: 'Dr. Tukaram Bhatt' },
  { id: 'survey', name: 'District Survey Officer (FAC)', color: 'bg-blue-600', description: 'D Someshwar' },
  { id: 'civil-supply', name: 'District Civil Supply Officer (FAC)', color: 'bg-orange-500', description: 'Vinod' },
  { id: 'public-relations', name: 'District Public Relations Officer (FAC)', color: 'bg-emerald-500', description: 'Y. Sampath Kumar' },
  { id: 'rural-development', name: 'District Rural Development Officer', color: 'bg-purple-600', description: 'Marri Surendar' },
  { id: 'minorities-welfare', name: 'District Minorities Welfare Officer (FAC)', color: 'bg-teal-500', description: 'Gorantla Sajeevan' },
  { id: 'mines-geology', name: 'Assistant Director Mines & Geology', color: 'bg-green-500', description: 'AD Mines' },
  { id: 'cooperative', name: 'District Cooperative Officer', color: 'bg-blue-600', description: '' },
  { id: 'panchayat', name: 'District Panchayat Officer', color: 'bg-orange-500', description: 'Bikshapathi' },
  { id: 'industries', name: 'General Manager, Industries (I/C)', color: 'bg-emerald-500', description: 'Ashok' },
  { id: 'labour', name: 'Labour Officer (FAC)', color: 'bg-purple-600', description: 'Mazharunnisa Begum' },
  { id: 'employment', name: 'District Employment Officer', color: 'bg-teal-500', description: 'A. Ravi Krishna' },
  { id: 'agriculture', name: 'District Agriculture Officer (FAC)', color: 'bg-blue-600', description: 'R. Sreenivas Rao' },
  { id: 'treasury', name: 'District Treasury Officer', color: 'bg-orange-500', description: 'Jadi Rajeshwar' },
  { id: 'district-manager', name: 'District Manager (FAC)', color: 'bg-emerald-500', description: '' },
  { id: 'tribal-development', name: 'District Tribal Development Officer', color: 'bg-purple-600', description: 'Ramadevi' },
  { id: 'bc-development', name: 'District BC Development Officer FAC', color: 'bg-teal-500', description: 'Sajeevan' },
  { id: 'veterinary', name: 'District Veterinary & Animal Husbandry Officer (FAC)', color: 'bg-green-500', description: 'M. Suresh Kumar' },
  { id: 'audit', name: 'District Audit Officer', color: 'bg-blue-600', description: 'Rajeswar' },
  { id: 'fisheries', name: 'District Fisheries Officer', color: 'bg-orange-500', description: 'Y. Sambashiva Rao' },
  { id: 'prohibition-excise', name: 'District Prohibition & Excise Officer', color: 'bg-emerald-500', description: 'B. Jyothi Kiran' },
  { id: 'horticulture', name: 'District Horticulture Officer', color: 'bg-purple-600', description: 'Marri Venkatesham' },
  { id: 'r&b', name: 'Executive Engineer (R&B)', color: 'bg-teal-500', description: 'G. Peddaiah' },
  { id: 'panchayat-raj-engineer', name: 'District Panchayat Raj Engineer, (EE) (PR)', color: 'bg-green-500', description: 'P Prabhkar' },
  { id: 'description-manager', name: 'description District Manager', color: 'bg-blue-600', description: 'V R Joshi' },
  { id: 'intermediate-education', name: 'District Intermediate Education Officer', color: 'bg-orange-500', description: '' },
  { id: 'education-officer', name: 'District Education Officer', color: 'bg-emerald-500', description: 'Not specified' },
  { id: 'sc-development', name: 'District S.C Development Officer', color: 'bg-purple-600', description: 'Not specified' },
  { id: 'revenue-divisional-officer', name: 'Revenue Divisional Officer', color: 'bg-teal-500', description: 'Not specified' },
  { id: 'municipal-kagaznagar', name: 'Municipal Commissioner Kagaznagar', color: 'bg-green-500', description: 'Not specified' },
  { id: 'municipal-asifabad', name: 'Municipal Commissioner Asifabad', color: 'bg-blue-600', description: 'Not specified' },
  { id: 'transport', name: 'District Transport Officer', color: 'bg-orange-500', description: 'Not specified' },
  { id: 'zilla-parishad', name: 'Zilla Parishad CEO', color: 'bg-emerald-500', description: 'Not specified' },
  { id: 'irrigation', name: 'Irrigation EE', color: 'bg-purple-600', description: 'Not specified' },
  { id: 'electricity', name: 'Electricity SE', color: 'bg-teal-500', description: 'Not specified' },
  { id: 'rws', name: 'RWS EE', color: 'bg-green-500', description: 'Not specified' },
  { id: 'marketing', name: 'Dist Marketing Officer', color: 'bg-blue-600', description: 'Not specified' },
  { id: 'degree-college', name: 'Principal Degree College Kagaznagar', color: 'bg-orange-500', description: 'Not specified' },
  { id: 'dchs', name: 'DCHS', color: 'bg-emerald-500', description: 'Not specified' }
];

// DWO specific metrics
const dwoMetrics = [
  {
    id: 'dwo-awcs',
    title: 'Active AWCs',
    value: '973',
    change: 2.5,
    status: 'positive',
    icon: Heart,
    description: 'Anganwadi Centers Operational'
  },
  {
    id: 'dwo-reporting',
    title: 'Reporting Rate',
    value: '100%',
    change: 0,
    status: 'positive',
    icon: TrendingUp,
    description: 'AWCs Submitting Reports'
  },
  {
    id: 'dwo-beneficiaries',
    title: 'Total Beneficiaries',
    value: '75,630', // Updated from Poshan Tracker mock data
    change: 7.5, // Adjusted
    status: 'positive',
    icon: Users,
    description: 'Children, Pregnant & Lactating Women'
  },
  {
    id: 'dwo-nutrition',
    title: 'Nutrition Distribution',
    value: '₹12.4 Cr',
    change: 15.6,
    status: 'positive',
    icon: Package,
    description: 'Monthly Food Distribution Value'
  }
];

// Generic department metrics function
const departmentMetrics = (departmentId) => {
  if (departmentId === 'dwo') return dwoMetrics;
  
  return [
    {
      id: `${departmentId}-budget`,
      title: 'Budget Allocation',
      value: '₹ 45.2 Cr',
      change: 12.6,
      status: 'positive',
      icon: BarChart3
    },
    {
      id: `${departmentId}-projects`,
      title: 'Active Projects',
      value: '24',
      change: 8.4,
      status: 'positive',
      icon: Briefcase
    },
    {
      id: `${departmentId}-staff`,
      title: 'Staff Count',
      value: '132',
      change: 3.2,
      status: 'positive',
      icon: Users
    },
    {
      id: `${departmentId}-reports`,
      title: 'Pending Reports',
      value: '7',
      change: -2.1,
      status: 'negative',
      icon: FileText
    }
  ];
};

// Metric Card Component
const MetricCard = ({ metric, className = "" }) => (
  <Card className={`hover:shadow-lg transition-all duration-300 ${className}`}>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <metric.icon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
            <p className="text-2xl font-bold">{metric.value}</p>
          </div>
        </div>
        {metric.change !== undefined && (
          <div className={`flex items-center space-x-1 text-sm ${
            metric.status === 'positive' ? 'text-green-600' : 'text-red-600'
          }`}>
            {metric.status === 'positive' ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <span>{Math.abs(metric.change)}%</span>
          </div>
        )}
      </div>
      {metric.description && (
        <p className="text-xs text-muted-foreground mt-2">{metric.description}</p>
      )}
    </CardContent>
  </Card>
);

// FCR Data Table Component
const FCRTable = () => (
  <Card className="col-span-full">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Package className="h-5 w-5" />
        Food Consolidation Report (FCR) - January 2025
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left p-3 font-semibold">District</th>
              <th className="text-left p-3 font-semibold">Location</th>
              <th className="text-center p-3 font-semibold">Total AWCs</th>
              <th className="text-center p-3 font-semibold">Reported</th>
              <th className="text-right p-3 font-semibold">Rice Opening (Kg)</th>
              <th className="text-right p-3 font-semibold">Rice Received (Kg)</th>
              <th className="text-right p-3 font-semibold">Rice Utilized (Kg)</th>
              <th className="text-center p-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {fcrData.map((row) => (
              <tr key={row.slNo} className="border-b hover:bg-muted/30">
                <td className="p-3">{row.district}</td>
                <td className="p-3 font-medium">{row.name}</td>
                <td className="p-3 text-center">{row.totalAWCs}</td>
                <td className="p-3 text-center">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                    {row.awcsReported}
                  </span>
                </td>
                <td className="p-3 text-right">{row.riceOpening.toLocaleString()}</td>
                <td className="p-3 text-right">{row.riceReceived.toLocaleString()}</td>
                <td className="p-3 text-right">{row.riceUtilized.toLocaleString()}</td>
                <td className="p-3 text-center">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                    Complete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 bg-muted/50 font-semibold">
              <td className="p-3" colSpan="2">TOTAL</td>
              <td className="p-3 text-center">{fcrData.reduce((sum, row) => sum + row.totalAWCs, 0)}</td>
              <td className="p-3 text-center">{fcrData.reduce((sum, row) => sum + row.awcsReported, 0)}</td>
              <td className="p-3 text-right">{fcrData.reduce((sum, row) => sum + row.riceOpening, 0).toLocaleString()}</td>
              <td className="p-3 text-right">{fcrData.reduce((sum, row) => sum + row.riceReceived, 0).toLocaleString()}</td>
              <td className="p-3 text-right">{fcrData.reduce((sum, row) => sum + row.riceUtilized, 0).toLocaleString()}</td>
              <td className="p-3 text-center">-</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </CardContent>
  </Card>
);

// NHTS Project Status Component
const NHTSProjectStatus = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Activity className="h-5 w-5" />
        NHTS Project Status
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
          <div>
            <p className="font-semibold text-blue-800">Total Survey Coverage</p>
            <p className="text-sm text-blue-600">Households surveyed under NHTS</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-800">87,450</p>
            <p className="text-sm text-blue-600">92% Complete</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
          <div>
            <p className="font-semibold text-green-800">Data Processing</p>
            <p className="text-sm text-green-600">Records processed and verified</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-green-800">78,235</p>
            <p className="text-sm text-green-600">89% Complete</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
          <div>
            <p className="font-semibold text-orange-800">Pending Reviews</p>
            <p className="text-sm text-orange-600">Awaiting final approval</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-orange-800">9,215</p>
            <p className="text-sm text-orange-600">11% Pending</p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Recent Activities Component
const RecentActivitiesCard = ({ departmentId }) => {
  const activities = departmentId === 'dwo' ? [
    { id: 1, title: "FCR Report Generated", time: "2 hours ago", type: "report" },
    { id: 2, title: "NHTS Survey Data Updated", time: "4 hours ago", type: "update" },
    { id: 3, title: "New AWC Registered - Mancherial", time: "1 day ago", type: "registration" },
    { id: 4, title: "Nutrition Distribution Completed", time: "2 days ago", type: "distribution" },
    { id: 5, title: "Monthly Review Meeting", time: "3 days ago", type: "meeting" }
  ] : [
    { id: 1, title: "Budget approval completed", time: "2 hours ago", type: "finance" },
    { id: 2, title: "New project milestone reached", time: "4 hours ago", type: "project" },
    { id: 3, title: "Staff training session completed", time: "1 day ago", type: "training" },
    { id: 4, title: "Monthly report submitted", time: "2 days ago", type: "report" },
    { id: 5, title: "Department meeting scheduled", time: "3 days ago", type: "meeting" }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activities.map((activity) => (
            <div key={activity.id} className="flex justify-between items-start p-3 hover:bg-muted/50 rounded-lg transition-colors">
              <div className="flex-1">
                <p className="font-medium text-sm">{activity.title}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                activity.type === 'report' ? 'bg-blue-100 text-blue-800' :
                activity.type === 'update' ? 'bg-green-100 text-green-800' :
                activity.type === 'registration' ? 'bg-purple-100 text-purple-800' :
                activity.type === 'distribution' ? 'bg-orange-100 text-orange-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {activity.type}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Poshan Tracker Tab Content Component
// This component now receives filter selections as props
const PoshanTrackerDashboard = ({ selectedMandal, selectedGramPanchayat, selectedMunicipality }) => {
  // Simulated Poshan Tracker data (aggregated, not mandal-specific from PDFs)
  const poshanTrackerSummaryData = {
    totalRegistered: 75630,
    aadhaarVerified: 68950,
    growthMonitoringEligible: 45200,
    growthMonitoringMeasured: 41850,
    snpEligible: 72300,
    snpReceived: 69500,
    homeVisitsScheduled: 15200,
    homeVisitsCompleted: 14100,
  };

  const poshanBeneficiaryCategories = [
    { name: "Children (0-6 months)", count: 7500, icon: Baby, color: "text-pink-600", bgColor: "bg-pink-50" },
    { name: "Children (6m-3yrs)", count: 22300, icon: Baby, color: "text-blue-600", bgColor: "bg-blue-50" },
    { name: "Children (3-6yrs)", count: 20850, icon: Baby, color: "text-green-600", bgColor: "bg-green-50" },
    { name: "Pregnant Women", count: 12480, icon: Heart, color: "text-red-600", bgColor: "bg-red-50" },
    { name: "Lactating Mothers", count: 12500, icon: Heart, color: "text-purple-600", bgColor: "bg-purple-50" },
  ];

  const { totalRegistered, aadhaarVerified, growthMonitoringEligible, growthMonitoringMeasured, snpEligible, snpReceived, homeVisitsScheduled, homeVisitsCompleted } = poshanTrackerSummaryData;

  // --- Calculations for Simulated Data ---
  const aadhaarVerificationRate = totalRegistered > 0 ? (aadhaarVerified / totalRegistered * 100).toFixed(1) : 0;
  const growthMonitoringRate = growthMonitoringEligible > 0 ? (growthMonitoringMeasured / growthMonitoringEligible * 100).toFixed(1) : 0;
  const snpCoverageRate = snpEligible > 0 ? (snpReceived / snpEligible * 100).toFixed(1) : 0;
  const homeVisitsRate = homeVisitsScheduled > 0 ? (homeVisitsCompleted / homeVisitsScheduled * 100).toFixed(1) : 0;

  // --- Dynamic Data Selection based on selectedMandal ---
  // If a specific mandal is selected and data exists for it, use that; otherwise, use 'all' (district totals).
  // Note: GPs and Municipalities are not used for filtering here due to data granularity limitations.
  const currentMandalData = detailedPoshanDataByMandal[selectedMandal] || detailedPoshanDataByMandal['all'];

  // Destructure mandal-specific data for easier use in rendering
  const {
    underweightChildrenPercentage, stuntedChildrenPercentage, samChildrenPercentage, mamChildrenPercentage,
    awcOwnBuildingPercentage, awcConductedVHSNDPercentage,
    totalAWCOpen, awcOpenedOutsideFencedArea, awcDidntOpen, totalChildren3YrTo6Yr,
    totalChildrenAttended, morningSnackGiven, totalHCMGiven, imageCaptured, noOfAWcCompletedECCE
  } = currentMandalData;

  const dataAvailableForMandal = (selectedMandal !== 'all' && detailedPoshanDataByMandal[selectedMandal]);
  
  const renderValue = (value) => {
    if (value === undefined || value === null) {
      return 'N/A';
    }
    return typeof value === 'number' ? value.toLocaleString() : value;
  };

  const renderPercentageValue = (value) => {
    if (value === undefined || value === null) {
      return 'N/A';
    }
    return `${value}%`;
  };

  const renderDescription = (baseText, mandalSpecific) => {
    if (mandalSpecific === undefined || mandalSpecific === null) {
      return 'Data not available for this Mandal.';
    }
    return baseText;
  };


  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Progress Card (using Simulated Data) */}
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
              <p className="text-xs text-muted-foreground mt-1">
                *Data for Aadhaar verification is simulated.
              </p>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Growth Monitoring (Children)</span>
                <span className="text-sm text-muted-foreground">{growthMonitoringRate}% ({growthMonitoringMeasured.toLocaleString()} / {growthMonitoringEligible.toLocaleString()})</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-green-600 h-3 rounded-full" style={{width: `${growthMonitoringRate}%`}}></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                *Data for growth monitoring is simulated.
              </p>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Supplementary Nutrition (SNP) Coverage</span>
                <span className="text-sm text-muted-foreground">{snpCoverageRate}% ({snpReceived.toLocaleString()} / {snpEligible.toLocaleString()})</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-orange-500 h-3 rounded-full" style={{width: `${snpCoverageRate}%`}}></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                *Data for SNP coverage is simulated.
              </p>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Home Visits Completion</span>
                <span className="text-sm text-muted-foreground">{homeVisitsRate}% ({homeVisitsCompleted.toLocaleString()} / {homeVisitsScheduled.toLocaleString()})</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-purple-500 h-3 rounded-full" style={{width: `${homeVisitsRate}%`}}></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                *Data for home visits is simulated.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Side Cards (using Simulated Data) */}
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

      {/* Additional Info Cards - Dynamically updated based on selectedMandal */}
      <h2 className="text-xl font-semibold mt-8 mb-4">
        {selectedMandal === 'all' ? 'District Level Nutrition & AWC Metrics' : `Nutrition & AWC Metrics for ${mandals.find(m => m.id === selectedMandal)?.name || 'Selected Mandal'}`}
         (April 2025 / May 2025)
      </h2>
      <p className="text-sm text-muted-foreground mb-4">
        *Data for these metrics is sourced from the NITI Aayog Report for April 2025 [cite: 5] and daily monitoring data from May 2025[cite: 1].
        If specific data for the selected Mandal is not available, overall district totals are shown.
        Filtering by GP or Municipality is not supported for these metrics due to current data granularity.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-md flex items-center gap-2">
                        <Scale className="h-5 w-5 text-purple-600" />
                        Underweight Children (0-6 yrs)
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold text-purple-700">
                        {renderPercentageValue(underweightChildrenPercentage)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {renderDescription(`This percentage is from the NITI Aayog report for April 2025.`, underweightChildrenPercentage)}
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-md flex items-center gap-2">
                        <Ruler className="h-5 w-5 text-cyan-600" />
                        Stunted Children (0-6 yrs)
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold text-cyan-700">
                        {renderPercentageValue(stuntedChildrenPercentage)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {renderDescription(`This percentage is from the NITI Aayog report for April 2025.`, stuntedChildrenPercentage)}
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-md flex items-center gap-2">
                        <HeartPulse className="h-5 w-5 text-red-600" />
                        SAM Children (0-6 yrs)
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold text-red-700">
                        {renderPercentageValue(samChildrenPercentage)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {renderDescription(`This percentage is from the NITI Aayog report for April 2025.`, samChildrenPercentage)}
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-md flex items-center gap-2">
                        <HeartHalf className="h-5 w-5 text-orange-600" />
                        MAM Children (0-6 yrs)
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold text-orange-700">
                        {renderPercentageValue(mamChildrenPercentage)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {renderDescription(`This percentage is from the NITI Aayog report for April 2025.`, mamChildrenPercentage)}
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-md flex items-center gap-2">
                        <Home className="h-5 w-5 text-blue-600" />
                        AWCs with Own Buildings
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold text-blue-700">
                        {renderPercentageValue(awcOwnBuildingPercentage)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {renderDescription(`This percentage is from the NITI Aayog report for April 2025.`, awcOwnBuildingPercentage)}
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-md flex items-center gap-2">
                        <CalendarCheck className="h-5 w-5 text-green-600" />
                        AWCs Conducted VHSND
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold text-green-700">
                        {renderPercentageValue(awcConductedVHSNDPercentage)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {renderDescription(`This percentage is from the NITI Aayog report for April 2025.`, awcConductedVHSNDPercentage)}
                    </p>
                </CardContent>
            </Card>
        </div>

        {/* Daily Monitoring (May 2025 Data from Screenshot 133) - Dynamically updated based on selectedMandal */}
        <h2 className="text-xl font-semibold mt-8 mb-4">Daily Monitoring Snapshots (May 2025)</h2>
        <p className="text-sm text-muted-foreground mb-4">
            *Data for these metrics is sourced from the daily monitoring report for May 2025[cite: 1].
            If specific data for the selected Mandal is not available, overall district totals are shown.
            Filtering by GP or Municipality is not supported for these metrics due to current data granularity.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-md flex items-center gap-2">
                        <DoorOpen className="h-5 w-5 text-amber-600" />
                        Total AWC Open (May 2025)
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold text-amber-700">
                        {renderValue(totalAWCOpen)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {renderDescription(`Total Anganwadi Centers reported open from May 2025 data.`, totalAWCOpen)}
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-md flex items-center gap-2">
                        <MapPinOff className="h-5 w-5 text-red-600" />
                        AWCs Opened Outside Fenced Area
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold text-red-700">
                        {renderValue(awcOpenedOutsideFencedArea)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {renderDescription(`AWCs reported open but located outside a fenced area from May 2025 data.`, awcOpenedOutsideFencedArea)}
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-md flex items-center gap-2">
                        <DoorClosed className="h-5 w-5 text-gray-600" />
                        AWCs Didn't Open
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold text-gray-700">
                        {renderValue(awcDidntOpen)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {renderDescription(`Anganwadi Centers reported as not open from May 2025 data.`, awcDidntOpen)}
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-md flex items-center gap-2">
                        <Users className="h-5 w-5 text-purple-600" />
                        Total Children (3-6 Yrs)
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold text-purple-700">
                        {renderValue(totalChildren3YrTo6Yr)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {renderDescription(`Total children aged 3-6 years recorded from May 2025 data.`, totalChildren3YrTo6Yr)}
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-md flex items-center gap-2">
                        <UserCheck className="h-5 w-5 text-teal-600" />
                        Total Children Attended
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold text-teal-700">
                        {renderValue(totalChildrenAttended)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {renderDescription(`Children who attended the Anganwadi Centers from May 2025 data.`, totalChildrenAttended)}
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-md flex items-center gap-2">
                        <Coffee className="h-5 w-5 text-brown-600" />
                        Morning Snack Given
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold text-brown-700">
                        {renderValue(morningSnackGiven)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {renderDescription(`Children who received morning snack from May 2025 data.`, morningSnackGiven)}
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-md flex items-center gap-2">
                        <Utensils className="h-5 w-5 text-lime-600" />
                        Total HCM Given
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold text-lime-700">
                        {renderValue(totalHCMGiven)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {renderDescription(`Children who received Hot Cooked Meal from May 2025 data.`, totalHCMGiven)}
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-md flex items-center gap-2">
                        <Camera className="h-5 w-5 text-gray-600" />
                        Image Captured
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold text-gray-700">
                        {renderValue(imageCaptured)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {renderDescription(`Images captured for reporting from May 2025 data.`, imageCaptured)}
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-md flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-indigo-600" />
                        No. of AWC Completed ECCE
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold text-indigo-700">
                        {renderValue(noOfAWcCompletedECCE)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {renderDescription(`Anganwadi Centers that completed Early Childhood Care and Education from May 2025 data.`, noOfAWcCompletedECCE)}
                    </p>
                </CardContent>
            </Card>
        </div>
    </div>
  );
};


// Main Dashboard Component
const DepartmentDashboardPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('dwo');
  // New state variables for the top dropdowns, initialized to 'all' for aggregation
  const [selectedTopDepartment, setSelectedTopDepartment] = useState('all');
  const [selectedMandal, setSelectedMandal] = useState('all'); // Default to 'all' to show district totals
  const [selectedGramPanchayat, setSelectedGramPanchayat] = useState('all'); // Default to 'all'
  const [selectedMunicipality, setSelectedMunicipality] = useState('all'); // Default to 'all'

  const currentDepartment = departments.find(d => d.id === selectedDepartment) || departments[0];
  
  return (
    <div className="space-y-8 max-w-[1600px] mx-auto p-6 animate-fade-in">
      {/* Top Header Section: Title/Breadcrumbs and Last Updated */}
      <div className="flex items-start justify-between mb-4">
        {/* Left section: Breadcrumbs and Title */}
        <div>
          <div className="flex items-center gap-x-2 text-sm text-muted-foreground">
            <span>Dashboards</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Department Dashboard</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mt-2">{currentDepartment.name}</h1>
          <p className="text-muted-foreground mt-1">{currentDepartment.description}</p>
        </div>

        {/* Right section: Last Updated */}
        <div className="flex-shrink-0 flex items-center text-sm text-muted-foreground gap-2 bg-muted px-3 py-1.5 rounded-md">
          <CalendarIcon className="h-4 w-4" />
          <span>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Filters Section: Below the main title block */}
      <div className="flex flex-wrap items-end gap-3 mb-4"> {/* flex-wrap for responsiveness, items-end to align at bottom */}
        {/* Department Dropdown */}
        <div className="flex flex-col">
          <label htmlFor="top-department-select" className="text-xs font-medium text-muted-foreground mb-1">Department</label>
          <select
            id="top-department-select"
            value={selectedTopDepartment}
            onChange={(e) => setSelectedTopDepartment(e.target.value)}
            className="block w-full min-w-[120px] p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            {topLevelDepartments.map(item => (
              <option key={item.id} value={item.id}>
                {item.name} ({item.abbreviation})
              </option>
            ))}
          </select>
        </div>

        {/** Dropdown for All Departments (10-20% width) **/}
            <div className="flex-shrink-0 w-[180px]">
              <label htmlFor="department-select" className="sr-only">Select Department</label>
              <select
                id="department-select"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                {departments.map(dept => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

        {/* Mandal Dropdown */}
        <div className="flex flex-col">
          <label htmlFor="mandal-select" className="text-xs font-medium text-muted-foreground mb-1">Mandal (Block)</label>
          <select
            id="mandal-select"
            value={selectedMandal}
            onChange={(e) => setSelectedMandal(e.target.value)}
            className="block w-full min-w-[120px] p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            {mandals.map(item => (
              <option key={item.id} value={item.id}>
                {item.name} ({item.abbreviation})
              </option>
            ))}
          </select>
        </div>

        {/* GP Dropdown */}
        <div className="flex flex-col">
          <label htmlFor="gp-select" className="text-xs font-medium text-muted-foreground mb-1">GP (Gram Panchayat)</label>
          <select
            id="gp-select"
            value={selectedGramPanchayat}
            onChange={(e) => setSelectedGramPanchayat(e.target.value)}
            className="block w-full min-w-[120px] p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            {gramPanchayats.map(item => (
              <option key={item.id} value={item.id}>
                {item.name} ({item.abbreviation})
              </option>
            ))}
          </select>
        </div>

        {/* Municipality Dropdown */}
        <div className="flex flex-col">
          <label htmlFor="municipality-select" className="text-xs font-medium text-muted-foreground mb-1">Municipality (Division)</label>
          <select
            id="municipality-select"
            value={selectedMunicipality}
            onChange={(e) => setSelectedMunicipality(e.target.value)}
            className="block w-full min-w-[120px] p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            {municipalities.map(item => (
              <option key={item.id} value={item.id}>
                {item.name} ({item.abbreviation})
              </option>
            ))}
          </select>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-6"> {/* Changed to grid-cols-6 */}
           <TabsTrigger value="overview">Overview</TabsTrigger>
           <TabsTrigger value="poshan"> <Baby className="h-4 w-4 mr-1 inline-block"/>Poshan Tracker</TabsTrigger> {/* Added Poshan Tracker Tab */}
           <TabsTrigger value="nhts">NHTS Project</TabsTrigger>
           <TabsTrigger value="reports">Data Reports</TabsTrigger>
           <TabsTrigger value="projects">Projects</TabsTrigger>
           <TabsTrigger value="staff">Staff</TabsTrigger>
           </TabsList>

        <TabsContent value="overview" className="space-y-6">
        {/* Department selectors: Scrollable and Dropdown */}
          <div className="flex items-center gap-2 mb-4">
            {/* Scrollable Department Buttons (80-90% width) */}
            <div className="flex-grow flex overflow-x-auto pb-4 hide-scrollbar">
              <div className="flex gap-2">
                {departments.map(dept => (
                  <button
                    key={dept.id}
                    onClick={() => setSelectedDepartment(dept.id)}
                    className={`flex-shrink-0 px-4 py-2 text-sm rounded-lg transition-all duration-200 hover:shadow-md ${
                      selectedDepartment === dept.id
                        ? `${dept.color} text-white shadow-lg`
                        : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    <div className="font-medium whitespace-nowrap">{dept.name}</div>
                    <div className="text-xs opacity-75 whitespace-nowrap">{dept.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/** Dropdown for All Departments (10-20% width)
            <div className="flex-shrink-0 w-[180px]">
              <label htmlFor="department-select" className="sr-only">Select Department</label>
              <select
                id="department-select"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                {departments.map(dept => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div> **/}
          </div>
          {/* Add this CSS somewhere in your global CSS file or a style tag if you want to hide the scrollbar */}
          <style jsx>{`
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .hide-scrollbar {
              -ms-overflow-style: none;  /* IE and Edge */
              scrollbar-width: none;  /* Firefox */
            }
          `}</style>
          
          {/* Department metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {departmentMetrics(selectedDepartment).map((metric) => (
              <MetricCard key={metric.id} metric={metric} className="hover:scale-105 transition-transform" />
            ))}
          </div>
          
          {/* Charts and visualizations */}
          {selectedDepartment === 'dwo' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <NHTSProjectStatus />
              <RecentActivitiesCard departmentId={selectedDepartment} />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Budget Utilization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    Budget charts will be implemented here
                  </div>
                </CardContent>
              </Card>
              <RecentActivitiesCard departmentId={selectedDepartment} />
            </div>
          )}
        </TabsContent>

      {/* Poshan Tracker Tab Content */}
        <TabsContent value="poshan" className="space-y-6">
          {selectedDepartment === 'dwo' ? (
            <PoshanTrackerDashboard
                selectedMandal={selectedMandal}
                selectedGramPanchayat={selectedGramPanchayat}
                selectedMunicipality={selectedMunicipality}
            />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Poshan Tracker Data</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Poshan Tracker data is typically available under the District Welfare Officer (DWO) view. Please select DWO to see the dashboard.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="nhts" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  NHTS Survey Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Survey Completion</span>
                      <span className="text-sm text-muted-foreground">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-blue-600 h-3 rounded-full" style={{width: '92%'}}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Data Processing</span>
                      <span className="text-sm text-muted-foreground">89%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-green-600 h-3 rounded-full" style={{width: '89%'}}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Quality Verification</span>
                      <span className="text-sm text-muted-foreground">76%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-orange-600 h-3 rounded-full" style={{width: '76%'}}></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">87,450</div>
                      <div className="text-sm text-blue-700">Total Households</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">78,235</div>
                      <div className="text-sm text-green-700">Completed Surveys</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Survey Teams</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Active Teams</span>
                      <span className="font-semibold">12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Total Surveyors</span>
                      <span className="font-semibold">48</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Avg. Daily Surveys</span>
                      <span className="font-semibold">285</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Data Quality</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Accuracy Rate</span>
                      <span className="font-semibold text-green-600">94.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Validation Errors</span>
                      <span className="font-semibold text-orange-600">1,247</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Re-surveys Required</span>
                      <span className="font-semibold text-red-600">325</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">FCR Reports</p>
                    <p className="text-2xl font-bold">5</p>
                  </div>
                  <Package className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">PHC Mapping</p>
                    <p className="text-2xl font-bold">Updated</p>
                  </div>
                  <MapPin className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">THR Reports</p>
                    <p className="text-2xl font-bold">Current</p>
                  </div>
                  <Heart className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Utilization</p>
                    <p className="text-2xl font-bold">89%</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <FCRTable />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>PHC Mapping Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium">Primary Health Centers</span>
                    <span className="text-lg font-bold text-blue-600">24</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">Sub-Centers Mapped</span>
                    <span className="text-lg font-bold text-green-600">156</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="font-medium">Coverage Area</span>
                    <span className="text-lg font-bold text-orange-600">95%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>THR Distribution Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="font-medium">Beneficiaries Covered</span>
                    <span className="text-lg font-bold text-purple-600">42,185</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-pink-50 rounded-lg">
                    <span className="font-medium">Distribution Rate</span>
                    <span className="text-lg font-bold text-pink-600">96.8%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                    <span className="font-medium">Monthly Target</span>
                    <span className="text-lg font-bold text-indigo-600">43,560</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>Department Projects</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDepartment === 'dwo' ? (
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">NHTS (National Health & Nutrition Survey)</h3>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">Active</span>
                    </div>
                    <p className="text-muted-foreground mb-3">Comprehensive household survey for health and nutrition data collection</p>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Progress:</span>
                        <span className="ml-1 font-medium">92%</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Timeline:</span>
                        <span className="ml-1 font-medium">On Track</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Budget:</span>
                        <span className="ml-1 font-medium">₹2.4 Cr</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">Anganwadi Modernization</h3>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">Ongoing</span>
                    </div>
                    <p className="text-muted-foreground mb-3">Infrastructure development and technology upgrades for AWCs</p>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Progress:</span>
                        <span className="ml-1 font-medium">78%</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Timeline:</span>
                        <span className="ml-1 font-medium">On Track</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Budget:</span>
                        <span className="ml-1 font-medium">₹5.8 Cr</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Project listing and details will be implemented for {currentDepartment.name}.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="staff">
          <Card>
            <CardHeader>
              <CardTitle>Staff Directory</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDepartment === 'dwo' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold">Anganwadi Workers</h4>
                    <p className="text-2xl font-bold text-blue-600">973</p>
                    <p className="text-sm text-muted-foreground">Active across all centers</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold">Supervisors</h4>
                    <p className="text-2xl font-bold text-green-600">89</p>
                    <p className="text-sm text-muted-foreground">Field supervisors</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold">Helpers</h4>
                    <p className="text-2xl font-bold text-orange-600">845</p>
                    <p className="text-sm text-muted-foreground">Assistant workers</p>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Staff listing and management will be implemented for {currentDepartment.name}.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DepartmentDashboardPage;