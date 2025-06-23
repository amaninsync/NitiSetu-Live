import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronRight, Briefcase, BarChart3, FileText, CalendarIcon, TrendingUp, TrendingDown, MapPin, Package, Users, Baby, AlertTriangle, Activity, Scale, Ruler, HeartPulse, Home, CalendarCheck, DoorOpen, MapPinOff, DoorClosed, UserCheck, Coffee, Utensils, Camera, GraduationCap, Heart, ClipboardList, Handshake, Sun } from 'lucide-react'; // Added new icons
import { FCRReportTab, PHCMappingTab, THRReportTab, UtilizationReportTab } from '../components/ReportTabs';
import { MCHKitDashboard } from '../components/MCHKitDashboard'; // Add this line

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
  { id: 'asifabad-m', name: 'Asifabad', abbreviation: 'AIFD' },
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
  { id: 'm-asifabad', name: 'Asifabad Municipality', abbreviation: 'ASIF' },
  { id: 'm-kagaznagar', name: 'Kagaznagar Municipality', abbreviation: 'KAGA' },
];

// Data for Gram Panchayats (GP)
const gramPanchayats = [
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
  { id: 'gp-chorpalli', name: 'Chorpalli', abbreviation: 'CRP' },
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
  { id: 'health', name: 'District Medical & Health Officer', color: 'bg-green-500', description: 'Dr. Tukaram Bhatt' },
  { id: 'revenue', name: 'District Revenue Officer /RDO Asifabad', color: 'bg-purple-600', description: 'V. Lokeshwara Rao' },
  { id: 'planning', name: 'Chief Planning Officer', color: 'bg-teal-500', description: 'P. Chinakotya Naik' },
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

const dmhoMetrics = [
    { id: 'dmho-deliveries', title: 'Total Deliveries (Current Month)', value: '44', icon: Baby, description: 'Total deliveries in public and private institutions' },
    { id: 'dmho-registrations', title: '1st Trimester Reg. (%)', value: '99%', icon: Users, description: 'Current month registration percentage' },
    { id: 'dmho-c-section', title: 'Pvt. C-Section Rate', value: '69%', icon: HeartPulse, description: 'Current month C-Section rate in private institutions' },
    { id: 'dmho-maternal-deaths', title: 'Maternal Deaths', value: '0', icon: AlertTriangle, status: 'positive', description: 'Current month reported maternal deaths' }
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
  if (departmentId === 'health') return dmhoMetrics;
  
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
              <th className="text-left p-3 font-semibold">Mandal</th>
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
const PoshanTrackerDashboard = () => {
  // Data provided by the user
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

  // --- Calculations ---
  const aadhaarVerificationRate = totalRegistered > 0 ? (aadhaarVerified / totalRegistered * 100).toFixed(1) : 0;
  const growthMonitoringRate = growthMonitoringEligible > 0 ? (growthMonitoringMeasured / growthMonitoringEligible * 100).toFixed(1) : 0;
  const snpCoverageRate = snpEligible > 0 ? (snpReceived / snpEligible * 100).toFixed(1) : 0;
  const homeVisitsRate = homeVisitsScheduled > 0 ? (homeVisitsCompleted / homeVisitsScheduled * 100).toFixed(1) : 0;

  // Additional Metrics from NITI Aayog Report (April 2025) and Screenshots
  // These values are taken from the previously analyzed documents and are specific to KB Asifabad district for April 2025,
  // whereas the poshanTrackerSummaryData is simulated, likely representing aggregated or different data.
  // For the purpose of this component, I am retaining the rich detail from the documents where appropriate for 'Additional Info Cards'.
  const underweightChildrenPercentage = 9.37; // Percentage of underweight children under 6 years
  const stuntedChildrenPercentage = 12.13; // Percentage of stunted children under 6 years
  const samChildrenPercentage = 0.54; // Percentage of Severe Acute Malnourishment (SAM) in Children under 6 years
  const mamChildrenPercentage = 2.53; // Precentage of Moderate Acute Malnutrition (MAM) in Children under 6 years
  const awcOwnBuildingPercentage = 36.38; // Proportion of Anganwadis with own Buildings
  const awcConductedVHSNDPercentage = 100.00; // Percentage of Anganwadi Reported to have conducted at least one VHSND

  // Counts from Screenshot (133) for May 2025 (District Level Totals)
  // These are for a different month and likely a different scope (district totals from a daily monitoring report)
  // compared to the simulated summary data. They are included here for richness of detail,
  // but note they might not directly align with the simulated summary data.
  const totalAWCOpen = 782; //
  const awcOpenedOutsideFencedArea = 596; //
  const awcDidntOpen = 191; //
  const totalChildren3YrTo6Yr = 21351; //
  const totalChildrenAttended = 8007; //
  const morningSnackGiven = 7856; //
  const totalHCMGiven = 7003; //
  const imageCaptured = 23; //
  const noOfAWcCompletedECCE = 791; //

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
            <p className="text-3xl font-bold text-brown-700">{morningSnackGiven.toLocaleString()}<small className="text-sm text-muted-foreground ml-1"></small></p>
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

// Data for Integrated Child Protection Services (ICPS)
const icpsData = [
  {
    caseNo: "ADB24-00333",
    dateOfEntry: "28/10/2024 01:37 PM",
    childName: "Nagargoj Dipali",
    age: 17,
    circumstances: "Missing",
    policeStation: "Adilabad-II Town PS(Adilabad)",
  },
  {
    caseNo: "KBD24-00086",
    dateOfEntry: "23/04/2024 12:08 PM",
    childName: "Elumule Homanthi",
    age: 17,
    circumstances: "Child Marriage Victim",
    policeStation: "Sirpur-T PS(Kumrambheem Asifabad)",
  },
  {
    caseNo: "KBD24-00088",
    dateOfEntry: "24/04/2024 11:43 AM",
    childName: "Nikade Ankitha",
    age: 16,
    circumstances: "Child Marriage Victim",
    policeStation: "Rebbana PS(Kumrambheem Asifabad)",
  },
  {
    caseNo: "KBD24-00095",
    dateOfEntry: "03/06/2024 12:46 PM",
    childName: "Bamne Mahesh",
    age: 9,
    circumstances: "Single Parent/Semi Orphan",
    policeStation: "",
  },
  {
    caseNo: "KBD24-00100",
    dateOfEntry: "05/06/2024 12:16 PM",
    childName: "Madavi Vijay Kumar",
    age: 11,
    circumstances: "Orphan",
    policeStation: "",
  },
  {
    caseNo: "KBD24-00117",
    dateOfEntry: "08/07/2024 02:09 PM",
    childName: "Rapaka Akash",
    age: 17,
    circumstances: "Child Labour",
    policeStation: "Asifabad PS(Kumrambheem Asifabad)",
  },
  {
    caseNo: "KBD24-00122",
    dateOfEntry: "09/07/2024 11:57 AM",
    childName: "Durgam Vinay Kumar",
    age: 10,
    circumstances: "Child Abuse/Exploitation",
    policeStation: "Penchikalpet PS(Kumrambheem Asifabad)",
  },
];


const ICPSReportTab = () => {
  const childProtectionStats = {
    orphans: 37,
    semiOrphans: 17,
    covidOrphans: 7,
    covidSemiOrphans: 59,
    hivAffected: 15,
    others: 2,
    totalSponsorship: 137,
    pocsoVictimCompensationBudget: "2,275,000", // in Rs.
    totalVictims2014_2024: 74,
  }; //

  const committees = {
    villageChildProtectionCommittees: 334,
    mandalLevelChildProtectionCommittee: 15,
    district: 1,
    ucpcWardLevel: 28,
  }; //

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Integrated Child Protection Services (ICPS) - Case Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-3 font-semibold">Case No</th>
                  <th className="text-left p-3 font-semibold">Date of Entry</th>
                  <th className="text-left p-3 font-semibold">Child Name</th>
                  <th className="text-center p-3 font-semibold">Age</th>
                  <th className="text-left p-3 font-semibold">Circumstances</th>
                  <th className="text-left p-3 font-semibold">Police Station</th>
                </tr>
              </thead>
              <tbody>
                {icpsData.map((row, index) => (
                  <tr key={index} className="border-b hover:bg-muted/30">
                    <td className="p-3">{row.caseNo}</td>
                    <td className="p-3">{row.dateOfEntry}</td>
                    <td className="p-3 font-medium">{row.childName}</td>
                    <td className="p-3 text-center">{row.age}</td>
                    <td className="p-3">{row.circumstances}</td>
                    <td className="p-3">{row.policeStation || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Child Protection Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="flex justify-between"><span>Orphans:</span> <span className="font-semibold">{childProtectionStats.orphans}</span><small className="text-sm text-muted-foreground ml-1"></small></p>
            <p className="flex justify-between"><span>Semi-orphans:</span> <span className="font-semibold">{childProtectionStats.semiOrphans}</span><small className="text-sm text-muted-foreground ml-1"></small></p>
            <p className="flex justify-between"><span>COVID-Orphans:</span> <span className="font-semibold">{childProtectionStats.covidOrphans}</span><small className="text-sm text-muted-foreground ml-1"></small></p>
            <p className="flex justify-between"><span>COVID-Semi Orphans:</span> <span className="font-semibold">{childProtectionStats.covidSemiOrphans}</span><small className="text-sm text-muted-foreground ml-1"></small></p>
            <p className="flex justify-between"><span>HIV Affected:</span> <span className="font-semibold">{childProtectionStats.hivAffected}</span><small className="text-sm text-muted-foreground ml-1"></small></p>
            <p className="flex justify-between"><span>Others:</span> <span className="font-semibold">{childProtectionStats.others}</span><small className="text-sm text-muted-foreground ml-1"></small></p>
            <p className="flex justify-between border-t mt-2 pt-2"><span>Total Sponsorships:</span> <span className="font-bold text-lg">{childProtectionStats.totalSponsorship}</span><small className="text-sm text-muted-foreground ml-1"></small></p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Scale className="h-5 w-5 text-green-600" />
              POCSO Victim Compensation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="flex justify-between"><span>Required Budget (Upto 2024):</span> <span className="font-bold text-lg">₹{parseInt(childProtectionStats.pocsoVictimCompensationBudget).toLocaleString()}</span><small className="text-sm text-muted-foreground ml-1"></small></p>
            <p className="flex justify-between"><span>Total Victims (2014-2024):</span> <span className="font-semibold">{childProtectionStats.totalVictims2014_2024}</span><small className="text-sm text-muted-foreground ml-1"></small></p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Home className="h-5 w-5 text-purple-600" />
              Child Protection Committees
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="flex justify-between"><span>Village Level:</span> <span className="font-semibold">{committees.villageChildProtectionCommittees}</span><small className="text-sm text-muted-foreground ml-1"></small></p>
            <p className="flex justify-between"><span>Mandal Level:</span> <span className="font-semibold">{committees.mandalLevelChildProtectionCommittee}</span><small className="text-sm text-muted-foreground ml-1"></small></p>
            <p className="flex justify-between"><span>District Level:</span> <span className="font-semibold">{committees.district}</span><small className="text-sm text-muted-foreground ml-1"></small></p>
            <p className="flex justify-between"><span>UCPC (Ward Level):</span> <span className="font-semibold">{committees.ucpcWardLevel}</span><small className="text-sm text-muted-foreground ml-1"></small></p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};


// Data for Operation Smile and Operation Muskan
const operationSmileMuskanData = {
  "2025-01-01": 56, //
  "2024-07-01": 61, //
};

const OperationSmileMuskanTab = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Sun className="h-5 w-5 text-yellow-600" />
        Operation Smile & Muskan Data
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {Object.entries(operationSmileMuskanData).map(([date, count]) => (
          <div key={date} className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
            <div>
              <p className="font-semibold text-yellow-800">Operation {new Date(date).getMonth() === 0 ? 'Smile' : 'Muskan'} - {new Date(date).getFullYear()}</p>
              <p className="text-sm text-yellow-600">Date: {new Date(date).toLocaleDateString()}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-yellow-800">{count}</p>
              <p className="text-sm text-yellow-600">Children Rescued/Identified</p>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-4">Data reflects the number of individuals identified or rescued during these operations.</p>
    </CardContent>
  </Card>
);

// Data for AWC Opened and Attendance Submitted
const awcAttendanceSummary = [
  { name: "ASIFABAD", totalAWCs: 276, awcsOpened: 254, openedPercentage: 92.03, notOpened: 0, notOpenedPercentage: 0, awtSubmittedAttendance: 254, attendanceSubmittedPercentage: 92.03, awtNotSubmittedAttendance: 22, attendanceNotSubmittedPercentage: 7.97 },
  { name: "JAINOOR", totalAWCs: 177, awcsOpened: 154, openedPercentage: 87.01, notOpened: 0, notOpenedPercentage: 0, awtSubmittedAttendance: 154, attendanceSubmittedPercentage: 87.01, awtNotSubmittedAttendance: 23, attendanceNotSubmittedPercentage: 12.99 },
  { name: "KAGAZNAGAR (U)", totalAWCs: 173, awcsOpened: 164, openedPercentage: 94.8, notOpened: 0, notOpenedPercentage: 0, awtSubmittedAttendance: 164, attendanceSubmittedPercentage: 94.8, awtNotSubmittedAttendance: 9, attendanceNotSubmittedPercentage: 5.2 },
  { name: "SIRPUR", totalAWCs: 202, awcsOpened: 199, openedPercentage: 98.51, notOpened: 0, notOpenedPercentage: 0, awtSubmittedAttendance: 199, attendanceSubmittedPercentage: 98.51, awtNotSubmittedAttendance: 3, attendanceNotSubmittedPercentage: 1.49 },
  { name: "WANKDI", totalAWCs: 183, awcsOpened: 116, openedPercentage: 63.39, notOpened: 0, notOpenedPercentage: 0, awtSubmittedAttendance: 116, attendanceSubmittedPercentage: 63.39, awtNotSubmittedAttendance: 67, attendanceNotSubmittedPercentage: 36.61 },
]; //

const awtAwhAttendanceReport = [
  { name: "ADA", totalAWTsSanctioned: 26, awtsInPosition: 23, awwSubmittedAttendance: 23, awtsAttendedPercentage: 100, awtsAttended: 23, awtsAttendedPercentage1: 100, awtsLeaveMeetingTraining: 0, awtsLeaveMeetingTrainingPercentage: 0, totalAWHsSanctioned: 26, awhsInPosition: 14, awhSubmittedAttendance: 14, awhsAttendedPercentage: 100, awhsAttended: 11, awhsAttendedPercentage1: 78.57, awhsLeaveMeetingTraining: 3, awhsLeaveMeetingTrainingPercentage: 21.43 },
  { name: "ASIFABAD", totalAWTsSanctioned: 30, awtsInPosition: 29, awwSubmittedAttendance: 27, awtsAttendedPercentage: 93.1, awtsAttended: 25, awtsAttendedPercentage1: 92.59, awtsLeaveMeetingTraining: 2, awtsLeaveMeetingTrainingPercentage: 7.41, totalAWHsSanctioned: 30, awhsInPosition: 23, awhSubmittedAttendance: 22, awhsAttendedPercentage: 95.65, awhsAttended: 21, awhsAttendedPercentage1: 95.45, awhsLeaveMeetingTraining: 1, awhsLeaveMeetingTrainingPercentage: 4.55 },
  { name: "BURUGUDA", totalAWTsSanctioned: 30, awtsInPosition: 29, awwSubmittedAttendance: 29, awtsAttendedPercentage: 100, awtsAttended: 29, awtsAttendedPercentage1: 100, awtsLeaveMeetingTraining: 0, awtsLeaveMeetingTrainingPercentage: 0, totalAWHsSanctioned: 30, awhsInPosition: 23, awhSubmittedAttendance: 23, awhsAttendedPercentage: 100, awhsAttended: 15, awhsAttendedPercentage1: 65.22, awhsLeaveMeetingTraining: 8, awhsLeaveMeetingTrainingPercentage: 34.78 },
  { name: "CHIRRAKUNTA", totalAWTsSanctioned: 21, awtsInPosition: 14, awwSubmittedAttendance: 13, awtsAttendedPercentage: 92.86, awtsAttended: 13, awtsAttendedPercentage1: 100, awtsLeaveMeetingTraining: 0, awtsLeaveMeetingTrainingPercentage: 0, totalAWHsSanctioned: 21, awhsInPosition: 13, awhSubmittedAttendance: 12, awhsAttendedPercentage: 92.31, awhsAttended: 9, awhsAttendedPercentage1: 75, awhsLeaveMeetingTraining: 3, awhsLeaveMeetingTrainingPercentage: 25 },
  { name: "GANGAPUR", totalAWTsSanctioned: 25, awtsInPosition: 23, awwSubmittedAttendance: 22, awtsAttendedPercentage: 95.65, awtsAttended: 22, awtsAttendedPercentage1: 100, awtsLeaveMeetingTraining: 0, awtsLeaveMeetingTrainingPercentage: 0, totalAWHsSanctioned: 25, awhsInPosition: 20, awhSubmittedAttendance: 18, awhsAttendedPercentage: 90, awhsAttended: 15, awhsAttendedPercentage1: 83.33, awhsLeaveMeetingTraining: 3, awhsLeaveMeetingTrainingPercentage: 16.67 },
  { name: "GINNEDHARI", totalAWTsSanctioned: 22, awtsInPosition: 18, awwSubmittedAttendance: 15, awtsAttendedPercentage: 83.33, awtsAttended: 14, awtsAttendedPercentage1: 93.33, awtsLeaveMeetingTraining: 1, awtsLeaveMeetingTrainingPercentage: 6.67, totalAWHsSanctioned: 22, awhsInPosition: 12, awhSubmittedAttendance: 10, awhsAttendedPercentage: 83.33, awhsAttended: 8, awhsAttendedPercentage1: 80, awhsLeaveMeetingTraining: 2, awhsLeaveMeetingTrainingPercentage: 20 },
  { name: "KHAIRGAON", totalAWTsSanctioned: 23, awtsInPosition: 21, awwSubmittedAttendance: 21, awtsAttendedPercentage: 100, awtsAttended: 20, awtsAttendedPercentage1: 95.24, awtsLeaveMeetingTraining: 1, awtsLeaveMeetingTrainingPercentage: 4.76, totalAWHsSanctioned: 23, awhsInPosition: 16, awhSubmittedAttendance: 16, awhsAttendedPercentage: 100, awhsAttended: 12, awhsAttendedPercentage1: 75, awhsLeaveMeetingTraining: 4, awhsLeaveMeetingTrainingPercentage: 25 },
  { name: "MOVAD", totalAWTsSanctioned: 24, awtsInPosition: 20, awwSubmittedAttendance: 14, awtsAttendedPercentage: 70, awtsAttended: 14, awtsAttendedPercentage1: 100, awtsLeaveMeetingTraining: 0, awtsLeaveMeetingTrainingPercentage: 0, totalAWHsSanctioned: 24, awhsInPosition: 17, awhSubmittedAttendance: 12, awhsAttendedPercentage: 70.59, awhsAttended: 11, awhsAttendedPercentage1: 91.67, awhsLeaveMeetingTraining: 1, awhsLeaveMeetingTrainingPercentage: 8.33 },
  { name: "REBBENA", totalAWTsSanctioned: 22, awtsInPosition: 21, awwSubmittedAttendance: 17, awtsAttendedPercentage: 80.95, awtsAttended: 17, awtsAttendedPercentage1: 100, awtsLeaveMeetingTraining: 0, awtsLeaveMeetingTrainingPercentage: 0, totalAWHsSanctioned: 22, awhsInPosition: 15, awhSubmittedAttendance: 11, awhsAttendedPercentage: 73.33, awhsAttended: 9, awhsAttendedPercentage1: 81.82, awhsLeaveMeetingTraining: 2, awhsLeaveMeetingTrainingPercentage: 18.18 },
  { name: "SUNGAPUR", totalAWTsSanctioned: 26, awtsInPosition: 17, awwSubmittedAttendance: 14, awtsAttendedPercentage: 82.35, awtsAttended: 14, awtsAttendedPercentage1: 100, awtsLeaveMeetingTraining: 0, awtsLeaveMeetingTrainingPercentage: 0, totalAWHsSanctioned: 26, awhsInPosition: 14, awhSubmittedAttendance: 11, awhsAttendedPercentage: 78.57, awhsAttended: 10, awhsAttendedPercentage1: 90.91, awhsLeaveMeetingTraining: 1, awhsLeaveMeetingTrainingPercentage: 9.09 },
  { name: "TIRYANI", totalAWTsSanctioned: 27, awtsInPosition: 22, awwSubmittedAttendance: 20, awtsAttendedPercentage: 90.91, awtsAttended: 20, awtsAttendedPercentage1: 100, awtsLeaveMeetingTraining: 0, awtsLeaveMeetingTrainingPercentage: 0, totalAWHsSanctioned: 27, awhsInPosition: 19, awhSubmittedAttendance: 16, awhsAttendedPercentage: 84.21, awhsAttended: 14, awhsAttendedPercentage1: 87.5, awhsLeaveMeetingTraining: 2, awhsLeaveMeetingTrainingPercentage: 12.5 },
]; //

const AWCAttendanceReportTab = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarCheck className="h-5 w-5 text-blue-600" />
          AWC Opened & Attendance Submitted (16/06/2025)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-3 font-semibold">Name</th>
                <th className="text-center p-3 font-semibold">Total AWCs</th>
                <th className="text-center p-3 font-semibold">AWCs Opened (%)</th>
                <th className="text-center p-3 font-semibold">AWTs Submitted Attendance (%)</th>
                <th className="text-center p-3 font-semibold">AWTs Not Submitted Attendance (%)</th>
              </tr>
            </thead>
            <tbody>
              {awcAttendanceSummary.map((row, index) => (
                <tr key={index} className="border-b hover:bg-muted/30">
                  <td className="p-3 font-medium">{row.name}</td>
                  <td className="p-3 text-center">{row.totalAWCs}</td>
                  <td className="p-3 text-center">{row.openedPercentage}%<small className="text-sm text-muted-foreground ml-1"></small></td>
                  <td className="p-3 text-center">{row.awtSubmittedAttendance}%<small className="text-sm text-muted-foreground ml-1"></small></td>
                  <td className="p-3 text-center">{row.attendanceNotSubmittedPercentage}%<small className="text-sm text-muted-foreground ml-1"></small></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserCheck className="h-5 w-5 text-green-600" />
          AWTs and AWHs Attendance Report (16/06/2025)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-3 font-semibold">Name</th>
                <th className="text-center p-3 font-semibold">AWTs In-Position</th>
                <th className="text-center p-3 font-semibold">AWTs Attended (%)</th>
                <th className="text-center p-3 font-semibold">AWHs In-Position</th>
                <th className="text-center p-3 font-semibold">AWHs Attended (%)</th>
              </tr>
            </thead>
            <tbody>
              {awtAwhAttendanceReport.map((row, index) => (
                <tr key={index} className="border-b hover:bg-muted/30">
                  <td className="p-3 font-medium">{row.name}</td>
                  <td className="p-3 text-center">{row.awtsInPosition}</td>
                  <td className="p-3 text-center">{row.awtsAttendedPercentage}%<small className="text-sm text-muted-foreground ml-1"></small></td>
                  <td className="p-3 text-center">{row.awhsInPosition}</td>
                  <td className="p-3 text-center">{row.awhsAttendedPercentage}%<small className="text-sm text-muted-foreground ml-1"></small></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Data for Spot Feeding Daily and Monthly Attendance
const spotFeedingDailyAttendance = [
  { id: 20101, name: "ASIFABAD", totalPW: 192, totalPWAttended: 182, pwAttendedPercentage: 94.79, totalLW: 128, totalLWAttended: 118, lwAttendedPercentage: 92.19, totalChild: 715, totalChildAttended: 444, childAttendedPercentage: 62.1 },
  { id: 20102, name: "ADA", totalPW: 116, totalPWAttended: 111, pwAttendedPercentage: 95.69, totalLW: 86, totalLWAttended: 86, lwAttendedPercentage: 100, totalChild: 602, totalChildAttended: 465, childAttendedPercentage: 77.24 },
  { id: 20103, name: "BURUGUDA", totalPW: 120, totalPWAttended: 99, pwAttendedPercentage: 82.5, totalLW: 72, totalLWAttended: 68, lwAttendedPercentage: 94.44, totalChild: 604, totalChildAttended: 330, childAttendedPercentage: 54.64 },
  { id: 20104, name: "CHIRRAKUNTA", totalPW: 54, totalPWAttended: 34, pwAttendedPercentage: 62.96, totalLW: 41, totalLWAttended: 27, lwAttendedPercentage: 65.85, totalChild: 282, totalChildAttended: 135, childAttendedPercentage: 47.87 },
  { id: 20105, name: "MOVAD", totalPW: 57, totalPWAttended: 49, pwAttendedPercentage: 85.96, totalLW: 28, totalLWAttended: 20, lwAttendedPercentage: 71.43, totalChild: 225, totalChildAttended: 169, childAttendedPercentage: 75.11 },
  { id: 20106, name: "KHAIRGAON", totalPW: 79, totalPWAttended: 71, pwAttendedPercentage: 89.87, totalLW: 63, totalLWAttended: 50, lwAttendedPercentage: 79.37, totalChild: 378, totalChildAttended: 213, childAttendedPercentage: 56.35 },
  { id: 20107, name: "GANGAPUR", totalPW: 109, totalPWAttended: 93, pwAttendedPercentage: 85.32, totalLW: 67, totalLWAttended: 56, lwAttendedPercentage: 83.58, totalChild: 413, totalChildAttended: 236, childAttendedPercentage: 57.14 },
  { id: 20108, name: "REBBENA", totalPW: 140, totalPWAttended: 118, pwAttendedPercentage: 84.29, totalLW: 84, totalLWAttended: 80, lwAttendedPercentage: 95.24, totalChild: 584, totalChildAttended: 188, childAttendedPercentage: 32.19 },
  { id: 20109, name: "GINNEDHARI", totalPW: 55, totalPWAttended: 51, pwAttendedPercentage: 92.73, totalLW: 56, totalLWAttended: 54, lwAttendedPercentage: 96.43, totalChild: 298, totalChildAttended: 221, childAttendedPercentage: 74.16 },
  { id: 20110, name: "TIRYANI", totalPW: 74, totalPWAttended: 72, pwAttendedPercentage: 97.3, totalLW: 64, totalLWAttended: 60, lwAttendedPercentage: 93.75, totalChild: 385, totalChildAttended: 204, childAttendedPercentage: 52.99 },
  { id: 20111, name: "SUNGAPUR", totalPW: 63, totalPWAttended: 46, pwAttendedPercentage: 73.02, totalLW: 51, totalLWAttended: 47, lwAttendedPercentage: 92.16, totalChild: 277, totalChildAttended: 149, childAttendedPercentage: 53.79 },
]; //

const spotFeedingMonthlyAttendance = [
  { month: "May", totalPWLW: 1799, totalPreSchoolChildren: 4763, totalBeneficiaries: 6562, attendedMoreThan21Days: 0, attendedMoreThan21DaysPercentage: 0, attendedLessThan21Days: 6562, attendedLessThan21DaysPercentage: 100 },
  { month: "April", totalPWLW: 1799, totalPreSchoolChildren: 4763, totalBeneficiaries: 6562, attendedMoreThan21Days: 0, attendedMoreThan21DaysPercentage: 0, attendedLessThan21Days: 6562, attendedLessThan21DaysPercentage: 100 },
  { month: "March", totalPWLW: 1799, totalPreSchoolChildren: 4763, totalBeneficiaries: 6562, attendedMoreThan21Days: 0, attendedMoreThan21DaysPercentage: 0, attendedLessThan21Days: 6562, attendedLessThan21DaysPercentage: 100 },
  { month: "February", totalPWLW: 1799, totalPreSchoolChildren: 4763, totalBeneficiaries: 6562, attendedMoreThan21Days: 0, attendedMoreThan21DaysPercentage: 0, attendedLessThan21Days: 6562, attendedLessThan21DaysPercentage: 100 },
  { month: "January", totalPWLW: 1799, totalPreSchoolChildren: 4763, totalBeneficiaries: 6562, attendedMoreThan21Days: 0, attendedMoreThan21DaysPercentage: 0, attendedLessThan21Days: 6562, attendedLessThan21DaysPercentage: 100 },
]; //

const SpotFeedingReportTab = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Utensils className="h-5 w-5 text-orange-600" />
          Spot Feeding Daily Attendance (16/06/2025)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-3 font-semibold">Name</th>
                <th className="text-center p-3 font-semibold">Total PW</th>
                <th className="text-center p-3 font-semibold">PW Attended (%)</th>
                <th className="text-center p-3 font-semibold">Total LW</th>
                <th className="text-center p-3 font-semibold">LW Attended (%)</th>
                <th className="text-center p-3 font-semibold">Total Child</th>
                <th className="text-center p-3 font-semibold">Child Attended (%)</th>
              </tr>
            </thead>
            <tbody>
              {spotFeedingDailyAttendance.map((row, index) => (
                <tr key={index} className="border-b hover:bg-muted/30">
                  <td className="p-3 font-medium">{row.name}</td>
                  <td className="p-3 text-center">{row.totalPW}<small className="text-sm text-muted-foreground ml-1"></small></td>
                  <td className="p-3 text-center">{row.pwAttendedPercentage}%<small className="text-sm text-muted-foreground ml-1"></small></td>
                  <td className="p-3 text-center">{row.totalLW}<small className="text-sm text-muted-foreground ml-1"></small></td>
                  <td className="p-3 text-center">{row.lwAttendedPercentage}%<small className="text-sm text-muted-foreground ml-1"></small></td>
                  <td className="p-3 text-center">{row.totalChild}<small className="text-sm text-muted-foreground ml-1"></small></td>
                  <td className="p-3 text-center">{row.childAttendedPercentage}%<small className="text-sm text-muted-foreground ml-1"></small></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Coffee className="h-5 w-5 text-brown-600" />
          Spot Feeding Monthly Attendance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-3 font-semibold">Month</th>
                <th className="text-center p-3 font-semibold">Total PW and LW</th>
                <th className="text-center p-3 font-semibold">Total Pre School Children</th>
                <th className="text-center p-3 font-semibold">Total Beneficiaries</th>
                <th className="text-center p-3 font-semibold">Attended less than 21 Days (%)</th>
              </tr>
            </thead>
            <tbody>
              {spotFeedingMonthlyAttendance.map((row, index) => (
                <tr key={index} className="border-b hover:bg-muted/30">
                  <td className="p-3 font-medium">{row.month}</td>
                  <td className="p-3 text-center">{row.totalPWLW}<small className="text-sm text-muted-foreground ml-1"></small></td>
                  <td className="p-3 text-center">{row.totalPreSchoolChildren}<small className="text-sm text-muted-foreground ml-1"></small></td>
                  <td className="p-3 text-center">{row.totalBeneficiaries}<small className="text-sm text-muted-foreground ml-1"></small></td>
                  <td className="p-3 text-center">{row.attendedLessThan21DaysPercentage}%<small className="text-sm text-muted-foreground ml-1"></small></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Data for Mission Shakti Activities
const missionShaktiActivityWise = {
  "2025 - 2026": [
    { activityName: "Having sessions of women/girls only support groups in local community centre at a set date monthly", noOfActivitiesConducted: 1, numberOfParticipants: 14 },
    { activityName: "Business women interaction with young girls from Minority communities", noOfActivitiesConducted: 1, numberOfParticipants: 17 },
    { activityName: "Creating safe spaces for women in public areas for breastfeeding", noOfActivitiesConducted: 1, numberOfParticipants: 40 },
    { activityName: "Focused Discussions", noOfActivitiesConducted: 3, numberOfParticipants: 77 },
    { activityName: "Ending stigma around mental health issues", noOfActivitiesConducted: 2, numberOfParticipants: 100 },
    { activityName: "Video series on trolling and digital bullying", noOfActivitiesConducted: 1, numberOfParticipants: 120 },
    { activityName: "Training sessions in schools and Anganwadi Centres", noOfActivitiesConducted: 1, numberOfParticipants: 170 },
    { activityName: "Declaring and incentivizing Child marriage Free Gram Panchayats/ Urban Local Bodies based on the Checklist", noOfActivitiesConducted: 4, numberOfParticipants: 308 },
    { activityName: "Awareness Camps", noOfActivitiesConducted: 4, numberOfParticipants: 650 },
    { activityName: "Other", noOfActivitiesConducted: 10, numberOfParticipants: 619 },
  ], //
  "2024 - 2025": [
    { activityName: "Making short animated videos on mental health", noOfActivitiesConducted: 1, numberOfParticipants: 10 },
    { activityName: "Counselling of Out-of-School Adolescent Girls and their families", noOfActivitiesConducted: 1, numberOfParticipants: 15 },
    { activityName: "Recognizing Women pioneers in Science and Technology", noOfActivitiesConducted: 1, numberOfParticipants: 18 },
    { activityName: "Training of girls on their rights in schools and Anganwadi centres", noOfActivitiesConducted: 1, numberOfParticipants: 48 },
    { activityName: "Girl child focused plan", noOfActivitiesConducted: 1, numberOfParticipants: 60 },
    { activityName: "Girls sports teams in all schools for all sports available", noOfActivitiesConducted: 1, numberOfParticipants: 66 },
    { activityName: "Tracking child marriages", noOfActivitiesConducted: 2, numberOfParticipants: 90 },
    { activityName: "Declaring and incentivizing Child marriage Free Gram Panchayats/ Urban Local Bodies based on the Checklist", noOfActivitiesConducted: 2, numberOfParticipants: 103 },
    { activityName: "PC&PNDT Act Enforcement Drives", noOfActivitiesConducted: 2, numberOfParticipants: 111 },
    { activityName: "Having sessions of women/girls only support groups in local community centre at a set date monthly", noOfActivitiesConducted: 3, numberOfParticipants: 117 },
    { activityName: "Training sessions in schools and Anganwadi Centres", noOfActivitiesConducted: 4, numberOfParticipants: 152 },
    { activityName: "Business women interaction with young girls from Minority communities", noOfActivitiesConducted: 2, numberOfParticipants: 157 },
    { activityName: "Safety sessions with digital experts in schools", noOfActivitiesConducted: 1, numberOfParticipants: 162 },
    { activityName: "Miking/ Awareness vans", noOfActivitiesConducted: 1, numberOfParticipants: 189 },
    { activityName: "Establishing safe support groups with similar issues", noOfActivitiesConducted: 1, numberOfParticipants: 190 },
    { activityName: "Movie screening at schools", noOfActivitiesConducted: 1, numberOfParticipants: 198 },
    { activityName: "Audio-visual aids and movie screening", noOfActivitiesConducted: 1, numberOfParticipants: 200 },
    { activityName: "Sensitivity drive", noOfActivitiesConducted: 1, numberOfParticipants: 238 },
    { activityName: "Declaring and promoting district level sports champions", noOfActivitiesConducted: 2, numberOfParticipants: 267 },
    { activityName: "Awareness Camps", noOfActivitiesConducted: 2, numberOfParticipants: 333 },
    { activityName: "Ending stigma around mental health issues", noOfActivitiesConducted: 1, numberOfParticipants: 400 },
    { activityName: "Career counselling activities", noOfActivitiesConducted: 2, numberOfParticipants: 449 },
    { activityName: "Girl child focused plan", noOfActivitiesConducted: 3, numberOfParticipants: 911 },
    { activityName: "Ending stigma around mental health issues", noOfActivitiesConducted: 14, numberOfParticipants: 1866 },
    { activityName: "Focused Discussions", noOfActivitiesConducted: 27, numberOfParticipants: 3358 },
    { activityName: "Life skill training at school level", noOfActivitiesConducted: 26, numberOfParticipants: 4339 },
    { activityName: "Other", noOfActivitiesConducted: 42, numberOfParticipants: 3760 },
  ], //
  "2023 2024": [
    { activityName: "Audio-visual aids and movie screening", noOfActivitiesConducted: 1, numberOfParticipants: 200 },
    { activityName: "Other", noOfActivitiesConducted: 3, numberOfParticipants: 336 },
  ], //
};

const missionShaktiBBBPData = {
    "Sectoral activities of Department of Women and Child Development": [
        { quarter: "Quarter-1", year: "2024-2025", month: "April", activity: 9 },
        { quarter: "Quarter-1", year: "2024-2025", month: "May", activity: 9 },
        { quarter: "Quarter-1", year: "2024-2025", month: "June", activity: 11 },
        { quarter: "Quarter-3", year: "2024-2025", month: "October", activity: 8 },
        { quarter: "Quarter-3", year: "2024-2025", month: "November", activity: 10 },
        { quarter: "Quarter-3", year: "2023-2024", month: "December", activity: 3 },
        { quarter: "Quarter-3", year: "2024-2025", month: "December", activity: 10 },
        { quarter: "Quarter-4", year: "2024-2025", month: "January", activity: 10 },
        { quarter: "Quarter-4", year: "2024-2025", month: "March", activity: 10 },
        { quarter: "Quarter-4", year: "2024-2025", month: "February", activity: 10 },
        { quarter: "Quarter-1", year: "2025-2026", month: "April", activity: 9 },
        { quarter: "Quarter-1", year: "2025-2026", month: "May", activity: 9 },
    ], //
    "BBBP Data (second table)": [
        { quarter: "Quarter-1", year: "2024-2025", month: "April", activity: 11 },
        { quarter: "Quarter-1", year: "2024-2025", month: "May", activity: 10 },
        { quarter: "Quarter-1", year: "2024-2025", month: "June", activity: 12 },
        { quarter: "Quarter-3", year: "2024-2025", month: "October", activity: 13 },
        { quarter: "Quarter-3", year: "2024-2025", month: "November", activity: 20 },
        { quarter: "Quarter-3", year: "2023-2024", month: "December", activity: 4 },
        { quarter: "Quarter-3", year: "2024-2025", month: "December", activity: 20 },
        { quarter: "Quarter-4", year: "2024-2025", month: "January", activity: 20 },
        { quarter: "Quarter-4", year: "2024-2025", month: "March", activity: 20 },
        { quarter: "Quarter-4", year: "2024-2025", month: "February", activity: 20 },
        { quarter: "Quarter-1", year: "2025-2026", month: "April", activity: 15 },
        { quarter: "Quarter-1", year: "2025-2026", month: "May", activity: 13 },
    ], //
    "Sectoral activities in Convergence with partner and line Departments": [
        { quarter: "Quarter-1", year: "2024-2025", month: "April", activity: 2 },
        { quarter: "Quarter-1", year: "2024-2025", month: "May", activity: 1 },
        { quarter: "Quarter-1", year: "2024-2025", month: "June", activity: 1 },
        { quarter: "Quarter-3", year: "2024-2025", month: "October", activity: 5 },
        { quarter: "Quarter-3", year: "2024-2025", month: "November", activity: 10 },
        { quarter: "Quarter-3", year: "2023-2024", month: "December", activity: 1 },
        { quarter: "Quarter-3", year: "2024-2025", month: "December", activity: 10 },
        { quarter: "Quarter-4", year: "2024-2025", month: "January", activity: 10 },
        { quarter: "Quarter-4", year: "2024-2025", month: "March", activity: 10 },
        { quarter: "Quarter-4", year: "2024-2025", month: "February", activity: 10 },
        { quarter: "Quarter-1", year: "2025-2026", month: "April", activity: 6 },
        { quarter: "Quarter-1", year: "2025-2026", month: "May", activity: 4 },
    ], //
    "Plantation Drive": [
        { financialYear: "2024-2025", quarter: "Quarter-1", month: "June", isConducted: "Yes" },
        { financialYear: "2024-2025", quarter: "Quarter-4", month: "January", isConducted: "Yes" },
    ], //
};

const weeklyActivityReportData = [
  { week: 1, activity: "Educational programmes,tour, publicity,awareness campaign(WHL-181, CHL-1098)", activityType: "Campaigns", noOfParticipants: 160, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 1, activity: "Educational programmes,tour, publicity,awareness campaign(WHL-181, CHL-1098)", activityType: "Awareness sessions", noOfParticipants: 140, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 1, activity: "Educational programmes,tour, publicity,awareness campaign(WHL-181, CHL-1098)", activityType: "Campaigns", noOfParticipants: 150, noOfRepresentativesPanchayatLocalBodies: 8, noOfPublicRepresentatives: 3, noOfBeneficiariesEnrolled: 0 },
  { week: 1, activity: "Educational programmes,tour, publicity,awareness campaign(WHL-181, CHL-1098)", activityType: "Other (National GirlChild DayCelebration)", noOfParticipants: 200, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 1, activity: "Educational programmes,tour, publicity,awareness campaign(WHL-181, CHL-1098)", activityType: "Awareness sessions", noOfParticipants: 120, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 1, activity: "Educational programmes,tour, publicity,awareness campaign(WHL-181, CHL-1098)", activityType: "Awareness sessions", noOfParticipants: 107, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 1, activity: "Other (BBBP yearscelebrationsPlantation)", activityType: "Plantation drives", noOfParticipants: 50, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 1, activity: "Educational programmes,tour, publicity,awareness campaign(WHL-181, CHL-1098)", activityType: "Awareness sessions", noOfParticipants: 180, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 1, activity: "Educational programmes,tour, publicity,awareness campaign(WHL-181, CHL-1098)", activityType: "Awareness sessions", noOfParticipants: 90, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 1, activity: "Educational programmes,tour, publicity,awareness campaign(WHL-181, CHL-1098)", activityType: "Awareness sessions", noOfParticipants: 70, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 1, activity: "Educational programmes,tour, publicity,awareness campaign(WHL-181, CHL-1098)", activityType: "Awareness sessions", noOfParticipants: 120, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 1, activity: "Educational programmes,tour, publicity,awareness campaign(WHL-181, CHL-1098)", activityType: "Awareness sessions", noOfParticipants: 103, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 1, activity: "Educational programmes,tour, publicity,awareness campaign(WHL-181, CHL-1098)", activityType: "Awareness sessions", noOfParticipants: 170, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 1, activity: "Educational programmes,tour, publicity,awareness campaign(WHL-181, CHL-1098)", activityType: "Awareness sessions", noOfParticipants: 120, noOfRepresentativesPanchayatLocalBodies: 2, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 1, activity: "Educational programmes,tour, publicity,awareness campaign(WHL-181, CHL-1098)", activityType: "Awareness sessions", noOfParticipants: 160, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 1, activity: "Other (BBBP yearscelebrationstwo km Rallywith slogans)", activityType: "Campaigns", noOfParticipants: 120, noOfRepresentativesPanchayatLocalBodies: 1, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 2, activity: "Other (Girl childempowermentclub)", activityType: "Awareness sessions", noOfParticipants: 120, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 3, activity: "Mental health awarenessweek", activityType: "Awareness Group", noOfParticipants: 16, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 3, activity: "Mental health awarenessweek", activityType: "Awareness Group", noOfParticipants: 18, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 2 },
  { week: 3, activity: "Mental health awarenessweek", activityType: "Awareness sessions", noOfParticipants: 120, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 3, activity: "Enrolment drive forgirl children inschools", activityType: "Enrolment drives", noOfParticipants: 4, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 3 },
  { week: 3, activity: "Mental health awarenessweek", activityType: "Awareness sessions", noOfParticipants: 170, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 3, activity: "Mental health awarenessweek", activityType: "Awareness sessions", noOfParticipants: 170, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 3, activity: "Mental health awarenessweek", activityType: "Awareness sessions", noOfParticipants: 59, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 1 },
  { week: 4, activity: "Other (MenstrualHygiene Health)", activityType: "Awareness sessions", noOfParticipants: 37, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 4, activity: "Other (MenstrualHygiene Health)", activityType: "Awareness sessions", noOfParticipants: 40, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 4, activity: "Other (MenstrualHygiene Health)", activityType: "Awareness sessions", noOfParticipants: 49, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 4, activity: "Other (MenstrualHygiene Health)", activityType: "Awareness sessions", noOfParticipants: 50, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 5, activity: "Motivational/inspirationalweek, girl meetingswith officials, visitsto Mahila Thana", activityType: "Awareness sessions", noOfParticipants: 380, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 5, activity: "Motivational/inspirationalweek, girl meetingswith officials, visitsto Mahila Thana", activityType: "Awareness sessions", noOfParticipants: 370, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 5, activity: "Motivational/inspirationalweek, girl meetingswith officials, visitsto Mahila Thana", activityType: "Awareness sessions", noOfParticipants: 290, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 5, activity: "Motivational/inspirationalweek, girl meetingswith officials, visitsto Mahila Thana", activityType: "Awareness sessions", noOfParticipants: 250, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 5, activity: "Motivational/inspirationalweek, girl meetingswith officials, visitsto Mahila Thana", activityType: "Awareness sessions", noOfParticipants: 190, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 1 },
  { week: 5, activity: "Motivational/inspirationalweek, girl meetingswith officials, visitsto Mahila Thana", activityType: "Awareness sessions", noOfParticipants: 378, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 5, activity: "Motivational/inspirationalweek, girl meetingswith officials, visitsto Mahila Thana", activityType: "Awareness sessions", noOfParticipants: 128, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 5, activity: "Motivational/inspirationalweek, girl meetingswith officials, visitsto Mahila Thana", activityType: "Awareness sessions", noOfParticipants: 160, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 5, activity: "Motivational/inspirationalweek, girl meetingswith officials, visitsto Mahila Thana", activityType: "Awareness sessions", noOfParticipants: 200, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 5, activity: "Motivational/inspirationalweek, girl meetingswith officials, visitsto Mahila Thana", activityType: "Awareness sessions", noOfParticipants: 111, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 5, activity: "Motivational/inspirationalweek, girl meetingswith officials, visitsto Mahila Thana", activityType: "Awareness sessions", noOfParticipants: 170, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 5, activity: "Motivational/inspirationalweek, girl meetingswith officials, visitsto Mahila Thana", activityType: "Awareness sessions", noOfParticipants: 56, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 5, activity: "Motivational/inspirationalweek, girl meetingswith officials, visitsto Mahila Thana", activityType: "Awareness sessions", noOfParticipants: 62, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 5, activity: "Motivational/inspirationalweek, girl meetingswith officials, visitsto Mahila Thana", activityType: "Awareness sessions", noOfParticipants: 190, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 5, activity: "Motivational/inspirationalweek, girl meetingswith officials, visitsto Mahila Thana", activityType: "Awareness sessions", noOfParticipants: 70, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 5, activity: "Motivational/inspirationalweek, girl meetingswith officials, visitsto Mahila Thana", activityType: "Awareness sessions", noOfParticipants: 253, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 5, activity: "Motivational/inspirationalweek, girl meetingswith officials, visitsto Mahila Thana", activityType: "Awareness sessions", noOfParticipants: 142, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 5, activity: "Motivational/inspirationalweek, girl meetingswith officials, visitsto Mahila Thana", activityType: "Awareness sessions", noOfParticipants: 125, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 5, activity: "Motivational/inspirationalweek, girl meetingswith officials, visitsto Mahila Thana", activityType: "Awareness sessions", noOfParticipants: 340, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 5, activity: "Motivational/inspirationalweek, girl meetingswith officials, visitsto Mahila Thana", activityType: "Awareness sessions", noOfParticipants: 80, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 5, activity: "Motivational/inspirationalweek, girl meetingswith officials, visitsto Mahila Thana", activityType: "Awareness sessions", noOfParticipants: 150, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 5, activity: "Motivational/inspirationalweek, girl meetingswith officials, visitsto Mahila Thana", activityType: "Awareness sessions", noOfParticipants: 34, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 5, activity: "Motivational/inspirationalweek, girl meetingswith officials, visitsto Mahila Thana", activityType: "Awareness sessions", noOfParticipants: 321, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 5, activity: "Motivational/inspirationalweek, girl meetingswith officials, visitsto Mahila Thana", activityType: "Awareness sessions", noOfParticipants: 79, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 5, activity: "Motivational/inspirationalweek, girl meetingswith officials, visitsto Mahila Thana", activityType: "Awareness sessions", noOfParticipants: 56, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 6, activity: "Other (StudentsMotivationalandinspirationalClasses)", activityType: "Awareness sessions", noOfParticipants: 114, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 6, activity: "Other (StudentsMotivationalandinspirationalClasses)", activityType: "Awareness sessions", noOfParticipants: 282, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 6, activity: "Other (StudentsMotivationalandinspirationalClasses)", activityType: "Awareness sessions", noOfParticipants: 273, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 6, activity: "Other (StudentsMotivationalandinspirationalClasses)", activityType: "Awareness sessions", noOfParticipants: 160, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 6, activity: "Other (StudentsMotivationalandinspirationalClasses)", activityType: "Awareness sessions", noOfParticipants: 52, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 6, activity: "Other (StudentsMotivationalandinspirationalClasses)", activityType: "Awareness sessions", noOfParticipants: 320, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 6, activity: "Other (StudentsMotivationalandinspirationalClasses)", activityType: "Awareness sessions", noOfParticipants: 87, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 6, activity: "Other (StudentsMotivationalandinspirationalClasses)", activityType: "Awareness sessions", noOfParticipants: 123, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 6, activity: "Other (StudentsMotivationalandinspirationalClasses)", activityType: "Awareness sessions", noOfParticipants: 147, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 6, activity: "Other (INTERNATIONALWOMENS DAYCELEBRATION)", activityType: "Other (INTERNATIONALWOMENS DAYCELEBRATION)", noOfParticipants: 180, noOfRepresentativesPanchayatLocalBodies: 3, noOfPublicRepresentatives: 1, noOfBeneficiariesEnrolled: 2 },
  { week: 6, activity: "Other (StudentsMotivationalandinspirationalClasses)", activityType: "Awareness sessions", noOfParticipants: 263, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 6, activity: "Other (StudentsMotivationalandinspirationalClasses)", activityType: "Awareness sessions", noOfParticipants: 190, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 6, activity: "Other (StudentsMotivationalandinspirationalClasses)", activityType: "Awareness sessions", noOfParticipants: 329, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 6, activity: "Awareness campaigns onwomen-centriclegislations andBharatiya Nyay Sanhita", activityType: "Awareness sessions", noOfParticipants: 170, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 6, activity: "Awareness campaigns onwomen-centriclegislations andBharatiya Nyay Sanhita", activityType: "Awareness sessions", noOfParticipants: 157, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 6, activity: "Other (StudentsMotivationalandinspirationalClasses)", activityType: "Awareness sessions", noOfParticipants: 120, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 6, activity: "Other (StudentsMotivationalandinspirationalClasses)", activityType: "Awareness sessions", noOfParticipants: 165, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 6, activity: "Other (StudentsMotivationalandinspirationalClasses)", activityType: "Awareness sessions", noOfParticipants: 150, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 6, activity: "Motivational/inspirationalweek, girl meetingswith officials, visitsto Mahila Thana", activityType: "Awareness sessions", noOfParticipants: 34, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 6, activity: "Motivational/inspirationalweek, girl meetingswith officials, visitsto Mahila Thana", activityType: "Awareness sessions", noOfParticipants: 321, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 5, activity: "Motivational/inspirationalweek, girl meetingswith officials, visitsto Mahila Thana", activityType: "Awareness sessions", noOfParticipants: 79, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
  { week: 5, activity: "Motivational/inspirationalweek, girl meetingswith officials, visitsto Mahila Thana", activityType: "Awareness sessions", noOfParticipants: 56, noOfRepresentativesPanchayatLocalBodies: 0, noOfPublicRepresentatives: 0, noOfBeneficiariesEnrolled: 0 },
]; //

const MissionShaktiDashboard = () => (
  <div className="space-y-6">
    {Object.entries(missionShaktiActivityWise).map(([year, activities]) => (
      <Card key={year}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Handshake className="h-5 w-5 text-purple-600" />
            Mission Shakti Activities - {year}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-3 font-semibold">Activity Name</th>
                  <th className="text-center p-3 font-semibold">No. of Activities Conducted</th>
                  <th className="text-center p-3 font-semibold">Number of Participants</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((row, index) => (
                  <tr key={index} className="border-b hover:bg-muted/30">
                    <td className="p-3">{row.activityName}</td>
                    <td className="p-3 text-center">{row.noOfActivitiesConducted}<small className="text-sm text-muted-foreground ml-1"></small></td>
                    <td className="p-3 text-center">{row.numberOfParticipants.toLocaleString()}<small className="text-sm text-muted-foreground ml-1"></small></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    ))}

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-blue-600" />
          BBBP Data - Sectoral Activities
        </CardTitle>
      </CardHeader>
      <CardContent>
        {Object.entries(missionShaktiBBBPData).map(([category, data], index) => (
            <div key={index} className="mb-6 last:mb-0">
                <h3 className="text-lg font-semibold mb-3">{category}</h3>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                        <thead>
                            <tr className="border-b bg-muted/50">
                                <th className="text-left p-2 font-semibold">Quarter</th>
                                <th className="text-left p-2 font-semibold">Year</th>
                                <th className="text-left p-2 font-semibold">Month</th>
                                <th className="text-center p-2 font-semibold">Activity Count / Conducted</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, rowIndex) => (
                                <tr key={rowIndex} className="border-b hover:bg-muted/30">
                                    <td className="p-2">{row.quarter || row.financialYear}<small className="text-sm text-muted-foreground ml-1"></small></td>
                                    <td className="p-2">{row.year || row.financialYear}<small className="text-sm text-muted-foreground ml-1"></small></td>
                                    <td className="p-2">{row.month}<small className="text-sm text-muted-foreground ml-1"></small></td>
                                    <td className="p-2 text-center">{row.activity || row.isConducted}<small className="text-sm text-muted-foreground ml-1"></small></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        ))}
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Weekly Activity Report - Asifabad
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-3 font-semibold">Week</th>
                <th className="text-left p-3 font-semibold">Activity</th>
                <th className="text-left p-3 font-semibold">Activity Type</th>
                <th className="text-center p-3 font-semibold">Participants</th>
                <th className="text-center p-3 font-semibold"> Panchayat Reps</th>
                <th className="text-center p-3 font-semibold"> Public Reps</th>
                <th className="text-center p-3 font-semibold"> Beneficiaries Enrolled</th>
              </tr>
            </thead>
            <tbody>
              {weeklyActivityReportData.map((row, index) => (
                <tr key={index} className="border-b hover:bg-muted/30">
                  <td className="p-3">{row.week}<small className="text-sm text-muted-foreground ml-1"></small></td>
                  <td className="p-3">{row.activity}<small className="text-sm text-muted-foreground ml-1"></small></td>
                  <td className="p-3">{row.activityType}<small className="text-sm text-muted-foreground ml-1"></small></td>
                  <td className="p-3 text-center">{row.noOfParticipants}<small className="text-sm text-muted-foreground ml-1"></small></td>
                  <td className="p-3 text-center">{row.noOfRepresentativesPanchayatLocalBodies}<small className="text-sm text-muted-foreground ml-1"></small></td>
                  <td className="p-3 text-center">{row.noOfPublicRepresentatives}<small className="text-sm text-muted-foreground ml-1"></small></td>
                  <td className="p-3 text-center">{row.noOfBeneficiariesEnrolled}<small className="text-sm text-muted-foreground ml-1"></small></td>
                </tr>
              ))}
            </tbody>
            <tfoot>
                <tr className="border-t-2 bg-muted/50 font-semibold">
                    <td className="p-3" colSpan="3">Total Participants</td>
                    <td className="p-3 text-center">{weeklyActivityReportData.reduce((sum, row) => sum + row.noOfParticipants, 0).toLocaleString()}<small className="text-sm text-muted-foreground ml-1"></small></td>
                    <td className="p-3 text-center">{weeklyActivityReportData.reduce((sum, row) => sum + row.noOfRepresentativesPanchayatLocalBodies, 0).toLocaleString()}<small className="text-sm text-muted-foreground ml-1"></small></td>
                    <td className="p-3 text-center">{weeklyActivityReportData.reduce((sum, row) => sum + row.noOfPublicRepresentatives, 0).toLocaleString()}<small className="text-sm text-muted-foreground ml-1"></small></td>
                    <td className="p-3 text-center">{weeklyActivityReportData.reduce((sum, row) => sum + row.noOfBeneficiariesEnrolled, 0).toLocaleString()}<small className="text-sm text-muted-foreground ml-1"></small></td>
                </tr>
            </tfoot>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
);


// Main Dashboard Component
const DepartmentDashboardPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('dwo');
  // New state variables for the top dropdowns
  const [selectedTopDepartment, setSelectedTopDepartment] = useState('all');
  const [selectedMandal, setSelectedMandal] = useState('asifabad-m');
  const [selectedGramPanchayat, setSelectedGramPanchayat] = useState('gp-kosara'); // Default to a valid GP
  const [selectedMunicipality, setSelectedMunicipality] = useState('m-asifabad');

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

        {/* Department Dropdown */}
        <div className="flex flex-col">
          <label htmlFor="top-department-select" className="text-xs font-medium text-muted-foreground mb-1">Department</label>
          <select
            id="top-department-select"
            value={selectedTopDepartment}
            onChange={(e) => setSelectedTopDepartment(e.target.value)}
            className="block w-full min-w-[120px] p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            {departments.map(dept => (
              <option key={dept.id} value={dept.id}>
                {dept.name} ({dept.abbreviation})
              </option>
            ))}
          </select>
        </div>
        
      </div>

      <Tabs defaultValue="overview" className="w-full">
           <TabsList className="grid w-full grid-cols-7"> {/* Changed to grid-cols-7 to accommodate new tab */}
           <TabsTrigger value="overview">Overview</TabsTrigger>
           <TabsTrigger value="poshan"> <Baby className="h-4 w-4 mr-1 inline-block"/>Poshan Tracker</TabsTrigger>
           <TabsTrigger value="mission-shakti"><Handshake className="h-4 w-4 mr-1 inline-block"/>Mission Shakti</TabsTrigger> {/* New Tab */}
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

            {/* Dropdown for All Departments (10-20% width)
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
            */}
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
          {/* Charts and visualizations */}
          {selectedDepartment === 'dwo' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <NHTSProjectStatus />
                  <RecentActivitiesCard departmentId={selectedDepartment} />
              </div>
          )}

          {selectedDepartment === 'health' && (
              <MCHKitDashboard />
          )}

          {selectedDepartment !== 'dwo' && selectedDepartment !== 'health' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                      <CardHeader><CardTitle>Budget Utilization</CardTitle></CardHeader>
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
            <PoshanTrackerDashboard />
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

      {/* Mission Shakti Tab Content */}
        <TabsContent value="mission-shakti" className="space-y-6">
            {selectedDepartment === 'dwo' ? (
                <MissionShaktiDashboard />
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>Mission Shakti Data</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Mission Shakti data is specifically handled by the District Welfare Officer (DWO). Please select DWO to view this data.</p>
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
    {/* This creates the new nested sub-tabs for reports */}
    <Tabs defaultValue="fcr" className="w-full">
        <TabsList className="grid w-full grid-cols-6"> {/* Adjusted grid-cols to fit new tabs */}
            <TabsTrigger value="fcr">
                <Package className="h-4 w-4 mr-1 inline-block"/> FCR Report
            </TabsTrigger>
            <TabsTrigger value="phc">
                <MapPin className="h-4 w-4 mr-1 inline-block"/> PHC Mapping
            </TabsTrigger>
            <TabsTrigger value="thr">
                <Heart className="h-4 w-4 mr-1 inline-block"/> THR Report
            </TabsTrigger>
            <TabsTrigger value="utilization">
                <BarChart3 className="h-4 w-4 mr-1 inline-block"/> Utilization Report
            </TabsTrigger>
            <TabsTrigger value="icps">
                <Baby className="h-4 w-4 mr-1 inline-block"/> ICPS Report
            </TabsTrigger>
            <TabsTrigger value="ops-smile-muskan">
                <Sun className="h-4 w-4 mr-1 inline-block"/> Ops Smile/Muskan
            </TabsTrigger>
        </TabsList>
        <TabsList className="grid w-full grid-cols-6">
                      <TabsTrigger value="awc-attendance">
                <Home className="h-4 w-4 mr-1 inline-block"/> AWC Attendance
            </TabsTrigger>
            <TabsTrigger value="spot-feeding">
                <Utensils className="h-4 w-4 mr-1 inline-block"/> Spot Feeding
            </TabsTrigger>
        </TabsList>

        <TabsContent value="fcr" className="mt-4">
            <FCRReportTab mandals={mandals} gramPanchayats={gramPanchayats} municipalities={municipalities} />
        </TabsContent>

        <TabsContent value="phc" className="mt-4">
            <PHCMappingTab mandals={mandals} gramPanchayats={gramPanchayats} municipalities={municipalities} />
        </TabsContent>

        <TabsContent value="thr" className="mt-4">
            <THRReportTab mandals={mandals} gramPanchayats={gramPanchayats} municipalities={municipalities} />
        </TabsContent>

        <TabsContent value="utilization" className="mt-4">
            <UtilizationReportTab mandals={mandals} gramPanchayats={gramPanchayats} municipalities={municipalities} />
        </TabsContent>

        {/* New Report Tabs */}
        <TabsContent value="icps" className="mt-4">
            <ICPSReportTab />
        </TabsContent>
        <TabsContent value="ops-smile-muskan" className="mt-4">
            <OperationSmileMuskanTab />
        </TabsContent>
        <TabsContent value="awc-attendance" className="mt-4">
            <AWCAttendanceReportTab />
        </TabsContent>
        <TabsContent value="spot-feeding" className="mt-4">
            <SpotFeedingReportTab />
        </TabsContent>
    </Tabs>
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