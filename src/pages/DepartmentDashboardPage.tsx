import React, { useState, useEffect } from 'react';

// Corrected import paths for shadcn/ui components
// IMPORTANT: Ensure these paths match your actual shadcn/ui setup.
// If your ui components are directly under 'src/ui', use './ui/card', etc.
// If they are under 'src/components/ui', use '../components/ui/card', etc.
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

// Lucide Icons
import { ChevronRight, Briefcase, BarChart3, FileText, CalendarIcon, TrendingUp, TrendingDown, MapPin, Package, Users, Baby, AlertTriangle, Activity, Scale, Ruler, HeartPulse, Home, CalendarCheck, DoorOpen, MapPinOff, DoorClosed, UserCheck, Coffee, Utensils, Camera, GraduationCap, Heart, ClipboardList, Handshake, Sun, Truck, CheckCircle, XCircle, Info, Medal } from 'lucide-react';

// --- Data Definitions (All Inlined and Global for clarity within this file) ---

const districts = [
    { id: 'kb-asifabad', name: 'Komaram Bheem Asifabad', abbreviation: 'KB A' },
    { id: 'mancherial', name: 'Mancherial', abbreviation: 'MCL' },
    { id: 'nirmal', name: 'Nirmal', abbreviation: 'NML' },
];

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

const municipalities = [
    { id: 'm-asifabad', name: 'Asifabad Municipality', abbreviation: 'ASIF' },
    { id: 'm-kagaznagar', name: 'Kagaznagar Municipality', abbreviation: 'KAGA' },
];

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
    { id: 'gp-kuntalamanepalli', name: 'Kuntalamanepally', abbreviation: 'KML' },
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
    { id: 'gp-chorpalle-lingapur', name: 'Chorpalle', abbreviation: 'CRP' },
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

const departments = [
    { id: 'dwo', name: 'District Welfare Officer', color: 'bg-purple-600', description: 'Dr. Bhasker', abbreviation: 'DWO' },
    { id: 'health', name: 'District Medical & Health Officer', color: 'bg-green-500', description: 'Dr. Tukaram Bhatt', abbreviation: 'DMHO' },
    { id: 'revenue', name: 'District Revenue Officer /RDO Asifabad', color: 'bg-indigo-600', description: 'V. Lokeshwara Rao', abbreviation: 'RDO' },
    { id: 'planning', name: 'Chief Planning Officer', color: 'bg-teal-500', description: 'P. Chinakotya Naik', abbreviation: 'CPO' },
    { id: 'survey', name: 'District Survey Officer (FAC)', color: 'bg-blue-600', description: 'D Someshwar', abbreviation: 'DSO' },
    { id: 'civil-supply', name: 'District Civil Supply Officer (FAC)', color: 'bg-orange-500', description: 'Vinod', abbreviation: 'DCSO' },
    { id: 'public-relations', name: 'District Public Relations Officer (FAC)', color: 'bg-emerald-500', description: 'Y. Sampath Kumar', abbreviation: 'DPRO' },
    { id: 'rural-development', name: 'District Rural Development Officer', color: 'bg-purple-600', description: 'Marri Surendar', abbreviation: 'DRDO' },
    { id: 'minorities-welfare', name: 'District Minorities Welfare Officer (FAC)', color: 'bg-teal-500', description: 'Gorantla Sajeevan', abbreviation: 'DMWO' },
    { id: 'mines-geology', name: 'Assistant Director Mines & Geology', color: 'bg-green-500', description: 'AD Mines', abbreviation: 'ADMG' },
    { id: 'cooperative', name: 'District Cooperative Officer', color: 'bg-blue-600', description: '', abbreviation: 'DCO' },
    { id: 'panchayat', name: 'District Panchayat Officer', color: 'bg-orange-500', description: 'Bikshapathi', abbreviation: 'DPO' },
    { id: 'industries', name: 'General Manager, Industries (I/C)', color: 'bg-emerald-500', description: 'Ashok', abbreviation: 'GM Ind' },
    { id: 'labour', name: 'Labour Officer (FAC)', color: 'bg-purple-600', description: 'Mazharunnisa Begum', abbreviation: 'LO' },
    { id: 'employment', name: 'District Employment Officer', color: 'bg-teal-500', description: 'A. Ravi Krishna', abbreviation: 'DEO' },
    { id: 'agriculture', name: 'District Agriculture Officer (FAC)', color: 'bg-blue-600', description: 'R. Sreenivas Rao', abbreviation: 'DAO' },
    { id: 'treasury', name: 'District Treasury Officer', color: 'bg-orange-500', description: 'Jadi Rajeshwar', abbreviation: 'DTO' },
    { id: 'district-manager', name: 'District Manager (FAC)', color: 'bg-emerald-500', description: '', abbreviation: 'DM' },
    { id: 'tribal-development', name: 'District Tribal Development Officer', color: 'bg-purple-600', description: 'Ramadevi', abbreviation: 'DTDO' },
    { id: 'bc-development', name: 'District BC Development Officer FAC', color: 'bg-teal-500', description: 'Sajeevan', abbreviation: 'DBCDO' },
    { id: 'veterinary', name: 'District Veterinary & Animal Husbandry Officer (FAC)', color: 'bg-green-500', description: 'M. Suresh Kumar', abbreviation: 'DVAHO' },
    { id: 'audit', name: 'District Audit Officer', color: 'bg-blue-600', description: 'Rajeswar', abbreviation: 'DAO' },
    { id: 'fisheries', name: 'District Fisheries Officer', color: 'bg-orange-500', description: 'Y. Sambashiva Rao', abbreviation: 'DFO' },
    { id: 'prohibition-excise', name: 'District Prohibition & Excise Officer', color: 'bg-emerald-500', description: 'B. Jyothi Kiran', abbreviation: 'DPEO' },
    { id: 'horticulture', name: 'District Horticulture Officer', color: 'bg-purple-600', description: 'Marri Venkatesham', abbreviation: 'DHO' },
    { id: 'r&b', name: 'Executive Engineer (R&B)', color: 'bg-teal-500', description: 'G. Peddaiah', abbreviation: 'EE R&B' },
    { id: 'panchayat-raj-engineer', name: 'District Panchayat Raj Engineer, (EE) (PR)', color: 'bg-green-500', description: 'P Prabhkar', abbreviation: 'EE PR' },
    { id: 'intermediate-education', name: 'District Intermediate Education Officer', color: 'bg-orange-500', description: '', abbreviation: 'DIEO' },
    { id: 'education-officer', name: 'District Education Officer', color: 'bg-emerald-500', description: 'Not specified', abbreviation: 'DEO' },
    { id: 'sc-development', name: 'District S.C Development Officer', color: 'bg-purple-600', description: 'Not specified', abbreviation: 'DSCDO' },
    { id: 'revenue-divisional-officer', name: 'Revenue Divisional Officer', color: 'bg-teal-500', description: 'Not specified', abbreviation: 'RDO' },
    { id: 'municipal-kagaznagar', name: 'Municipal Commissioner Kagaznagar', color: 'bg-green-500', description: 'Not specified', abbreviation: 'MC KZR' },
    { id: 'municipal-asifabad', name: 'Municipal Commissioner Asifabad', color: 'bg-blue-600', description: 'Not specified', abbreviation: 'MC ASIF' },
    { id: 'transport', name: 'District Transport Officer', color: 'bg-orange-500', description: 'Not specified', abbreviation: 'DTO' },
    { id: 'zilla-parishad', name: 'Zilla Parishad CEO', color: 'bg-emerald-500', description: 'Not specified', abbreviation: 'ZP CEO' },
    { id: 'irrigation', name: 'Irrigation EE', color: 'bg-purple-600', description: 'Not specified', abbreviation: 'Irr EE' },
    { id: 'electricity', name: 'Electricity SE', color: 'bg-teal-500', description: 'Not specified', abbreviation: 'Elec SE' },
    { id: 'rws', name: 'RWS EE', color: 'bg-green-500', description: 'Not specified', abbreviation: 'RWS EE' },
    { id: 'marketing', name: 'Dist Marketing Officer', color: 'bg-blue-600', description: 'Not specified', abbreviation: 'DMO' },
    { id: 'degree-college', name: 'Principal Degree College Kagaznagar', color: 'bg-orange-500', description: 'Not specified', abbreviation: 'Principal DC' },
    { id: 'dchs', name: 'DCHS', color: 'bg-emerald-500', description: 'Not specified', abbreviation: 'DCHS' }
];

const dmhoMetrics = [
    { id: 'dmho-deliveries', title: 'Total Deliveries (Current Month)', value: '44', icon: Baby, description: 'Total deliveries in public and private institutions' },
    { id: 'dmho-registrations', title: '1st Trimester Reg. (%)', value: '99%', icon: Users, description: 'Current month registration percentage' },
    { id: 'dmho-c-section', title: 'Pvt. C-Section Rate', value: '69%', icon: HeartPulse, description: 'Current month C-Section rate in private institutions' },
    { id: 'dmho-maternal-deaths', title: 'Maternal Deaths', value: '0', icon: AlertTriangle, status: 'positive', description: 'Current month reported maternal deaths' }
];

const dwoMetrics = [
    {
        id: 'dwo-awcs',
        title: 'Active AWCs',
        value: '973',
        change: 2.5,
        status: 'positive',
        icon: Home,
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
        value: '75,630',
        change: 7.5,
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

const fcrData = [
    { slNo: 1, district: "KB Asifabad", name: "ASIFABAD", totalAWCs: 260, awcsReported: 260, riceOpening: 20252.472, riceReceived: 12950, riceUtilized: 12260.963 },
    { slNo: 2, district: "KB Asifabad", name: "JAINOOR", totalAWCs: 175, awcsReported: 175, riceOpening: 14067.419, riceReceived: 9550, riceUtilized: 10550.834 },
    { slNo: 3, district: "KB Asifabad", name: "KAGAZNAGAR", totalAWCs: 180, awcsReported: 180, riceOpening: 15432.125, riceReceived: 8750, riceUtilized: 11250.450 },
    { slNo: 4, district: "KB Asifabad", name: "SIRPUR", totalAWCs: 195, awcsReported: 195, riceOpening: 18245.875, riceReceived: 10200, riceUtilized: 13150.225 },
    { slNo: 5, district: "KB Asifabad", name: "MANCHERIAL", totalAWCs: 163, awcsReported: 163, riceOpening: 12875.340, riceReceived: 8950, riceUtilized: 9875.680 }
];

const phcMappingData = [
    { id: 1, phc: 'ASIFABAD PHC', mappedAWCs: 30, latitude: '19.3660° N', longitude: '79.2970° E' },
    { id: 2, phc: 'JAINOOR PHC', mappedAWCs: 25, latitude: '19.6640° N', longitude: '79.4300° E' },
    { id: 3, phc: 'KAGAZNAGAR PHC', mappedAWCs: 35, latitude: '19.3360° N', longitude: '79.4670° E' },
    { id: 4, phc: 'REBBENA PHC', mappedAWCs: 28, latitude: '19.1670° N', longitude: '79.5290° E' },
    { id: 5, phc: 'TIRYANI PHC', mappedAWCs: 22, latitude: '19.3780° N', longitude: '79.2080° E' },
];

const thrReportData = [
    { id: 1, center: 'AWC 101, Asifabad', stock: 150, distributed: 120, balance: 30, status: 'Sufficient' },
    { id: 2, center: 'AWC 205, Jainoor', stock: 80, distributed: 75, balance: 5, status: 'Low' },
    { id: 3, center: 'AWC 310, Kagaznagar', stock: 200, distributed: 180, balance: 20, status: 'Sufficient' },
    { id: 4, center: 'AWC 402, Rebbena', stock: 100, distributed: 100, balance: 0, status: 'Critical' },
];

const utilizationReportData = [
    { id: 1, category: 'Supplementary Nutrition', budgetAllocated: 5000000, amountSpent: 4800000, utilization: 96 },
    { id: 2, category: 'Infrastructure Development', budgetAllocated: 2000000, amountSpent: 1500000, utilization: 75 },
    { id: 3, category: 'Training & Capacity Building', budgetAllocated: 1000000, amountSpent: 950000, utilization: 95 },
];

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
};

const committees = {
    villageChildProtectionCommittees: 334,
    mandalLevelChildProtectionCommittee: 15,
    district: 1,
    ucpcWardLevel: 28,
};

const operationSmileMuskanData = {
    "2025-01-01": 56, // Operation Smile 2025
    "2024-07-01": 61, // Operation Muskan 2024
};

const awcAttendanceSummary = [
    { name: "ASIFABAD", totalAWCs: 276, awcsOpened: 254, openedPercentage: 92.03, notOpened: 0, notOpenedPercentage: 0, awtSubmittedAttendance: 254, attendanceSubmittedPercentage: 92.03, awtNotSubmittedAttendance: 22, attendanceNotSubmittedPercentage: 7.97 },
    { name: "JAINOOR", totalAWCs: 177, awcsOpened: 154, openedPercentage: 87.01, notOpened: 0, notOpenedPercentage: 0, awtSubmittedAttendance: 154, attendanceSubmittedPercentage: 87.01, awtNotSubmittedAttendance: 23, attendanceNotSubmittedPercentage: 12.99 },
    { name: "KAGAZNAGAR (U)", totalAWCs: 173, awcsOpened: 164, openedPercentage: 94.8, notOpened: 0, notOpenedPercentage: 0, awtSubmittedAttendance: 164, attendanceSubmittedPercentage: 94.8, awtNotSubmittedAttendance: 9, attendanceNotSubmittedPercentage: 5.2 },
    { name: "SIRPUR", totalAWCs: 202, awcsOpened: 199, openedPercentage: 98.51, notOpened: 0, notOpenedPercentage: 0, awtSubmittedAttendance: 199, attendanceSubmittedPercentage: 98.51, awtNotSubmittedAttendance: 3, attendanceNotSubmittedPercentage: 1.49 },
    { name: "WANKDI", totalAWCs: 183, awcsOpened: 116, openedPercentage: 63.39, notOpened: 0, notOpenedPercentage: 0, awtSubmittedAttendance: 116, attendanceSubmittedPercentage: 63.39, awtNotSubmittedAttendance: 67, attendanceNotSubmittedPercentage: 36.61 },
];

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
];

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
];

const spotFeedingMonthlyAttendance = [
    { month: "May", totalPWLW: 1799, totalPreSchoolChildren: 4763, totalBeneficiaries: 6562, attendedMoreThan21Days: 0, attendedMoreThan21DaysPercentage: 0, attendedLessThan21Days: 6562, attendedLessThan21DaysPercentage: 100 },
    { month: "April", totalPWLW: 1799, totalPreSchoolChildren: 4763, totalBeneficiaries: 6562, attendedMoreThan21Days: 0, attendedMoreThan21DaysPercentage: 0, attendedLessThan21Days: 6562, attendedLessThan21DaysPercentage: 100 },
    { month: "March", totalPWLW: 1799, totalPreSchoolChildren: 4763, totalBeneficiaries: 6562, attendedMoreThan21Days: 0, attendedMoreThan21DaysPercentage: 0, attendedLessThan21Days: 6562, attendedLessThan21DaysPercentage: 100 },
    { month: "February", totalPWLW: 1799, totalPreSchoolChildren: 4763, totalBeneficiaries: 6562, attendedMoreThan21Days: 0, attendedMoreThan21DaysPercentage: 0, attendedLessThan21Days: 6562, attendedLessThan21DaysPercentage: 100 },
    { month: "January", totalPWLW: 1799, totalPreSchoolChildren: 4763, totalBeneficiaries: 6562, attendedMoreThan21Days: 0, attendedMoreThan21DaysPercentage: 0, attendedLessThan21Days: 6562, attendedLessThan21DaysPercentage: 100 },
];

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
    ],
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
    ],
    "2023 - 2024": [
        { activityName: "Audio-visual aids and movie screening", noOfActivitiesConducted: 1, numberOfParticipants: 200 },
        { activityName: "Other", noOfActivitiesConducted: 3, numberOfParticipants: 336 },
    ],
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
    ],
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
    ],
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
    ],
    "Plantation Drive": [
        { financialYear: "2024-2025", quarter: "Quarter-1", month: "June", isConducted: "Yes" },
        { financialYear: "2024-2025", quarter: "Quarter-4", month: "January", isConducted: "Yes" },
    ],
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
];

const allSchemesData = [
    {
        id: 'poshan-abhiyaan',
        name: 'Poshan Abhiyaan (National Nutrition Mission)',
        description: 'A flagship program to improve nutritional outcomes for children, pregnant women, and lactating mothers. Focuses on growth monitoring, supplementary nutrition, and home visits. Data influenced by Poshan Tracker reports.',
        overall: { saturation: 86.57, lagDays: 15.0, target: 90.0, progressDetail: 'Strong community engagement and consistent reporting. Some delays in infrastructure updates for new centers.' },
        geographicalData: {
            districts: {
                'kb-asifabad': { saturation: 87.23, lagDays: 11.0, target: 91.0, progressDetail: 'Exceeded target for growth monitoring, minor lag in Aadhaar seeding for new beneficiaries.' },
                'mancherial': { saturation: 81.51, lagDays: 16.0, target: 86.0, progressDetail: 'Steady progress, focus on increasing home visits and reporting compliance.' },
                'nirmal': { saturation: 77.15, lagDays: 31.0, target: 84.0, progressDetail: 'Needs improvement in last-mile delivery and data validation.' }
            },
            mandals: {
                'asifabad-m': { saturation: 90.17, lagDays: 21.0, target: 95.0, progressDetail: 'Strong community engagement. Minor delays in monthly data consolidation.' },
                'bejjur-m': { saturation: 63.84, lagDays: 32.0, target: 74.0, progressDetail: 'Requires improved reporting and AWC worker training.' },
                'dahegaon-m': { saturation: 85.29, lagDays: 0, target: 90.0, progressDetail: 'Exceptional real-time data entry and minimal delays.' },
                'jainoor-m': { saturation: 64.05, lagDays: 14.0, target: 71.0, progressDetail: 'Requires improved beneficiary identification and follow-ups.' },
                'kagaznagar-m': { saturation: 76.33, lagDays: 37.0, target: 74.0, progressDetail: 'Strong community engagement but some administrative bottlenecks.' },
                'kerameri-m': { saturation: 83.77, lagDays: 6.0, target: 82.0, progressDetail: 'Minor operational delays, but overall good progress in service delivery.' },
                'kouthala-m': { saturation: 91.94, lagDays: 5.0, target: 95.0, progressDetail: 'Beneficiary identification ongoing, with high conversion rates.' },
                'rebbena-m': { saturation: 76.94, lagDays: 20.0, target: 77.0, progressDetail: 'Strong community engagement. Needs focus on vulnerable groups.' },
                'sirpur-t-m': { saturation: 95.15, lagDays: 31.0, target: 95.0, progressDetail: 'Strong community engagement but reporting accuracy could improve.' },
                'sirpur-u-m': { saturation: 68.74, lagDays: 24.0, target: 73.0, progressDetail: 'Strong community engagement. Data reflects effective local coordination.' },
                'tiryani-m': { saturation: 91.19, lagDays: 16.0, target: 91.0, progressDetail: 'Minor operational delays. Focus on ensuring continuous service delivery.' },
                'wankidi-m': { saturation: 81.98, lagDays: 30.0, target: 87.0, progressDetail: 'Minor operational delays, particularly in remote areas.' },
                'lingapur-m': { saturation: 74.88, lagDays: 33.0, target: 86.0, progressDetail: 'Minor operational delays. Requires increased community awareness.' },
                'penchicalpet-m': { saturation: 93.47, lagDays: 44.0, target: 98.0, progressDetail: 'Minor operational delays due to funding cycles. High potential for improvement.' },
                'chintalamanepally-m': { saturation: 92.0, lagDays: 5.0, target: 94.0, progressDetail: 'Beneficiary identification ongoing, with consistent follow-ups.' }
            },
            gps: {
                'kosara-gp': { saturation: 93.01, lagDays: 36.0, target: 94.0, progressDetail: 'Requires improved reporting quality. Manual data reconciliation needed.' },
                'malangondi-gp': { saturation: 83.89, lagDays: 48.0, target: 83.0, progressDetail: 'Requires improved reporting frequency. System lags in updating status.' },
                'venkatapur-gp': { saturation: 62.92, lagDays: 54.0, target: 64.0, progressDetail: 'Consistent progress but manual verification causes significant delays.' },
                'tumpalli-gp': { saturation: 67.98, lagDays: 14.0, target: 68.0, progressDetail: 'Minor operational delays, but basic services are consistently delivered.' },
                'appapally-gp': { saturation: 79.45, lagDays: 42.0, target: 88.0, progressDetail: 'Minor operational delays in new beneficiary registration process.' },
                'koutaguda-gp': { saturation: 91.53, lagDays: 26.0, target: 92.0, progressDetail: 'Focus on last-mile connectivity. Some challenges in biometric attendance.' },
                'chilatiguda-gp': { saturation: 87.17, lagDays: 34.0, target: 90.0, progressDetail: 'Minor operational delays due to connectivity issues in remote areas.' },
                'motuguda-gp': { saturation: 85.2, lagDays: 23.0, target: 91.0, progressDetail: 'Focus on last-mile connectivity for service delivery and data collection.' },
                'govindapur-gp': { saturation: 81.68, lagDays: 26.0, target: 79.0, progressDetail: 'Requires improved reporting timeliness. Data often submitted late.' },
                'padibanda-gp': { saturation: 80.19, lagDays: 43.0, target: 82.0, progressDetail: 'Strong community engagement. Challenges in fund disbursement tracking.' },
                'manikguda-gp': { saturation: 91.7, lagDays: 32.0, target: 93.0, progressDetail: 'Strong community engagement, but manual report consolidation delays insights.' },
                'babapur-gp': { saturation: 89.04, lagDays: 23.0, target: 96.0, progressDetail: 'Requires improved reporting quality. Some gaps in field supervision.' },
                'wavudam-gp': { saturation: 58.21, lagDays: 26.0, target: 63.0, progressDetail: 'Beneficiary identification ongoing. Need to verify actual service receipt.' },
                'ankusapur-gp': { saturation: 75.14, lagDays: 36.0, target: 80.0, progressDetail: 'Beneficiary identification ongoing. Lag in updating Aadhaar details.' },
                'ada-dasnapur-gp': { saturation: 75.27, lagDays: 12.0, target: 79.0, progressDetail: 'Consistent progress. Need to improve digital literacy among field staff.' },
                'gundi-gp': { saturation: 87.02, lagDays: 38.0, target: 95.0, progressDetail: 'Requires improved reporting frequency. Data validation is a bottleneck.' },
                'yellaram-gp': { saturation: 86.68, lagDays: 37.0, target: 85.0, progressDetail: 'Focus on last-mile connectivity. Supplies sometimes arrive late.' },
                'routsankepalle-gp': { saturation: 85.77, lagDays: 53.0, target: 85.0, progressDetail: 'Beneficiary identification ongoing, but home visits are irregular.' },
                'buruguda-gp': { saturation: 69.22, lagDays: 36.0, target: 78.0, progressDetail: 'Requires improved reporting quality from ground level workers.' },
                'mowad-gp': { saturation: 55.19, lagDays: 15.0, target: 65.0, progressDetail: 'Consistent progress but low overall penetration in deep rural pockets.' },
                'ada-gp': { saturation: 91.5, lagDays: 29.0, target: 99, progressDetail: 'Requires improved reporting. Data entry is sometimes delayed from field.' },
                'chirrakunta-gp': { saturation: 83.91, lagDays: 4.0, target: 86.0, progressDetail: 'Focus on last-mile connectivity. Efficient service delivery noted.' },
                'asifabad-gp': { saturation: 89.02, lagDays: 46.0, target: 89.0, progressDetail: 'Consistent progress, but city-level reporting can be complex.' },
                'chorpalli-gp': { saturation: 60.52, lagDays: 60.0, target: 64.0, progressDetail: 'Strong community engagement, but significant lag in administrative approvals.' },
                'edulawada-gp': { saturation: 84.69, lagDays: 0, target: 83.0, progressDetail: 'Minor operational delays; very effective and timely service.' },
                'rahapally-gp': { saturation: 59.3, lagDays: 49.0, target: 65.0, progressDetail: 'Minor operational delays due to supply chain inconsistencies.' },
                'saleguda-gp': { saturation: 100, lagDays: 47.0, target: 99, progressDetail: 'Consistent progress; excellent in achieving saturation, but data validation is slow.' },
                'andhugulaguda-gp': { saturation: 74.37, lagDays: 43.0, target: 71.0, progressDetail: 'Strong community engagement, but program material distribution has delays.' },
                'outsarangipalle-gp': { saturation: 56.47, lagDays: 0, target: 65.0, progressDetail: 'Consistent progress but overall coverage is limited by reach.' },
                'kukuda-gp': { saturation: 71.53, lagDays: 26.0, target: 74.0, progressDetail: 'Requires improved reporting. Digital reporting is nascent.' },
                'pothepally-gp': { saturation: 75.65, lagDays: 10.0, target: 80.0, progressDetail: 'Beneficiary identification ongoing. Good on-site service delivery.' },
                'kushnepalle-gp': { saturation: 89.84, lagDays: 0.0, target: 86.0, progressDetail: 'Strong community engagement; highly efficient and effective program.' },
                'kuntalamanepalli-gp': { saturation: 100, lagDays: 2.0, target: 99, progressDetail: 'Consistent progress; nearly perfect service delivery and reporting.' },
                'mogavelly-gp': { saturation: 83.85, lagDays: 17.0, target: 90.0, progressDetail: 'Strong community engagement. Data is mostly up-to-date.' },
                'rebbena-gp': { saturation: 74.42, lagDays: 34.0, target: 86.0, progressDetail: 'Strong community engagement, but some reporting discrepancies.' },
                'sushmir-gp': { saturation: 82.99, lagDays: 12.0, target: 84.0, progressDetail: 'Consistent progress with timely updates.' },
                'somini-gp': { saturation: 100, lagDays: 23.0, target: 99, progressDetail: 'Focus on last-mile connectivity. Achieved full saturation, but data reporting has delays.' },
                'ambhaghat-gp': { saturation: 57.21, lagDays: 20.0, target: 64.0, progressDetail: 'Focus on last-mile connectivity. Awareness campaigns are starting.' },
                'thummalaguda-gp': { saturation: 92.84, lagDays: 42.0, target: 98.0, progressDetail: 'Consistent progress, but slow validation of new beneficiaries.' },
                'talai-gp': { saturation: 74.86, lagDays: 46.0, target: 73.0, progressDetail: 'Requires improved reporting accuracy and timeliness from field.' },
                'bareguda-gp': { saturation: 94.19, lagDays: 6.0, target: 97.0, progressDetail: 'Requires improved reporting processes. Good overall performance.' },
                'katepalli-gp': { saturation: 100, lagDays: 11.0, target: 99, progressDetail: 'Requires improved reporting infrastructure. High saturation achieved.' },
                'marthadi-gp': { saturation: 91.68, lagDays: 50.0, target: 98.0, progressDetail: 'Strong community engagement, but data transmission is slow.' },
                'bejjur-gp': { saturation: 62.08, lagDays: 34.0, target: 62.0, progressDetail: 'Focus on last-mile connectivity, particularly remote AWC visits.' },
                'munjampalle-gp': { saturation: 85.24, lagDays: 9.0, target: 96.0, progressDetail: 'Requires improved reporting consistency. Good service delivery.' },
                'papanpet-gp': { saturation: 89.12, lagDays: 45.0, target: 86.0, progressDetail: 'Focus on last-mile connectivity, but data collection has significant lag.' },
                'sulugupalli-gp': { saturation: 65.6, lagDays: 20.0, target: 74.0, progressDetail: 'Focus on last-mile connectivity. Need to verify service receipt.' },
                'pedda-siddapur-gp': { saturation: 85.69, lagDays: 28.0, target: 89.0, progressDetail: 'Consistent progress, but some challenges with new registrations.' },
                'lambadiguda-gp': { saturation: 96.77, lagDays: 21.0, target: 99, progressDetail: 'Consistent progress. Data updates can be delayed.' },
                'chinnaraspalle-gp': { saturation: 94.72, lagDays: 3.0, target: 99, progressDetail: 'Beneficiary identification ongoing, very efficient operation.' },
                'borlakunta-gp': { saturation: 79.9, lagDays: 20.0, target: 83.0, progressDetail: 'Beneficiary identification ongoing. Data verification is robust.' },
                'kothmir-gp': { saturation: 64.61, lagDays: 37.0, target: 73.0, progressDetail: 'Focus on last-mile connectivity. Awareness needs to improve.' },
                'pesarikunta-gp': { saturation: 80.07, lagDays: 14.0, target: 91.0, progressDetail: 'Minor operational delays. Overall good adoption.' },
                'digida-gp': { saturation: 74.6, lagDays: 38.0, target: 82.0, progressDetail: 'Strong community engagement, but reporting data flow is slow.' },
                'dahegaon-gp': { saturation: 82.77, lagDays: 22.0, target: 84.0, progressDetail: 'Strong community engagement and good service uptake.' },
                'chandrapalle-gp': { saturation: 76.41, lagDays: 41.0, target: 79.0, progressDetail: 'Minor operational delays in material distribution.' },
                'rampur-gp': { saturation: 66.26, lagDays: 28.0, target: 72.0, progressDetail: 'Strong community engagement. Need to streamline approvals.' },
                'motleguda-gp': { saturation: 70.53, lagDays: 52.0, target: 77.0, progressDetail: 'Consistent progress, but critical lag in data consolidation.' },
                'kamarpally-gp': { saturation: 92.02, lagDays: 23.0, target: 91.0, progressDetail: 'Minor operational delays. High overall service delivery.' },
                'gerre-gp': { saturation: 59.84, lagDays: 44.0, target: 63.0, progressDetail: 'Requires improved reporting from remote AWCs.' },
                'kalwada-gp': { saturation: 73.43, lagDays: 2.0, target: 74.0, progressDetail: 'Consistent progress with high efficiency in reporting.' },
                'laggaon-gp': { saturation: 69.23, lagDays: 0, target: 75.0, progressDetail: 'Consistent progress; excellent and real-time reporting.' },
                'ainam-gp': { saturation: 86.56, lagDays: 14.0, target: 92.0, progressDetail: 'Consistent progress. Needs better data on health outcomes.' },
                'vodduguda-gp': { saturation: 85.29, lagDays: 43.0, target: 93.0, progressDetail: 'Consistent progress, but delayed reporting of last-mile verification.' },
                'hathni-gp': { saturation: 91.06, lagDays: 22.0, target: 90.0, progressDetail: 'Requires improved reporting timeliness. Good service delivery.' },
                'kunchavelli-gp': { saturation: 86.18, lagDays: 28.0, target: 93.0, progressDetail: 'Beneficiary identification ongoing. Data quality is good.' },
                'chowka-gp': { saturation: 93.45, lagDays: 22.0, target: 99, progressDetail: 'Minor operational delays, but excellent overall program execution.' },
                'beebra-gp': { saturation: 78.78, lagDays: 6.0, target: 82.0, progressDetail: 'Beneficiary identification ongoing. Timely service provision.' },
                'pp-rao-colony-gp': { saturation: 82.51, lagDays: 13.0, target: 84.0, progressDetail: 'Beneficiary identification ongoing. Strong urban outreach.' },
                'ityal-gp': { saturation: 70.87, lagDays: 18.0, target: 74.0, progressDetail: 'Requires improved reporting consistency and feedback loop.' },
                'kharji-gp': { saturation: 86.48, lagDays: 12.0, target: 98.0, progressDetail: 'Strong community engagement. Data accuracy is high.' },
                'girvelli-gp': { saturation: 85.28, lagDays: 2.0, target: 91.0, progressDetail: 'Requires improved reporting to capture nuanced details. Highly efficient.' },
                'bhamanagar-gp': { saturation: 92.45, lagDays: 37.0, target: 91.0, progressDetail: 'Consistent progress, but delayed submission of community meeting reports.' },
                'pocham-loddi-gp': { saturation: 91.88, lagDays: 9.0, target: 99, progressDetail: 'Strong community engagement. Effective in reaching beneficiaries.' },
                'raoji-guda-gp': { saturation: 83.34, lagDays: 0, target: 94.0, progressDetail: 'Requires improved reporting speed. Excellent service delivery.' },
                'dubbaguda-gp': { saturation: 94.67, lagDays: 32.0, target: 98.0, progressDetail: 'Minor operational delays due to resource allocation.' },
                'ushegaon-gp': { saturation: 99.26, lagDays: 14.0, target: 99, progressDetail: 'Beneficiary identification ongoing. Near perfect saturation.' },
                'power-guda-gp': { saturation: 67.13, lagDays: 54.0, target: 72.0, progressDetail: 'Focus on last-mile connectivity. Significant challenges in remote area access.' },
                'andh-guda-gp': { saturation: 76.6, lagDays: 21.0, target: 86.0, progressDetail: 'Requires improved reporting accuracy for program activities.' },
                'maniguda-gp': { saturation: 64.47, lagDays: 2.0, target: 67.0, progressDetail: 'Consistent progress, but limited overall program reach.' },
                'panapatar-gp': { saturation: 73.09, lagDays: 0.0, target: 74.0, progressDetail: 'Minor operational delays. Effective in localizing services.' },
                'jamni-gp': { saturation: 65.79, lagDays: 13.0, target: 72.0, progressDetail: 'Strong community engagement. Data reporting requires reinforcement.' },
                'para-gp': { saturation: 72.26, lagDays: 12.0, target: 71.0, progressDetail: 'Requires improved reporting format for consistency.' },
                'chinthakara-gp': { saturation: 90.72, lagDays: 18.0, target: 89.0, progressDetail: 'Focus on last-mile connectivity. Good progress on outreach.' },
                'rasimatta-gp': { saturation: 69.02, lagDays: 19.0, target: 70.0, progressDetail: 'Strong community engagement. Needs faster issue resolution.' },
                'gudamamda-gp': { saturation: 86.99, lagDays: 7.0, target: 91.0, progressDetail: 'Minor operational delays. Good overall transparency in data.' },
                'bhusimetta-gp': { saturation: 73.8, lagDays: 27.0, target: 72.0, progressDetail: 'Beneficiary identification ongoing. Needs better follow-up process.' },
                'gowri-kolamguda-gp': { saturation: 73.21, lagDays: 32.0, target: 78.0, progressDetail: 'Focus on last-mile connectivity. Data consolidation is slow.' },
                'shivnoor-gp': { saturation: 83.1, lagDays: 34.0, target: 93.0, progressDetail: 'Strong community engagement, but reporting is inconsistent.' },
                'addesara-gp': { saturation: 64.9, lagDays: 10.0, target: 73.0, progressDetail: 'Requires improved reporting. Data capturing needs standardization.' },
                'daboli-gp': { saturation: 77.29, lagDays: 12.0, target: 84.0, progressDetail: 'Beneficiary identification ongoing. Good service distribution.' },
                'ashapalle-gp': { saturation: 81.63, lagDays: 45.0, target: 86.0, progressDetail: 'Requires improved reporting frequency. Significant data lag.' },
                'jamgaon-gp': { saturation: 75.36, lagDays: 16.0, target: 84.0, progressDetail: 'Strong community engagement. Needs better data validation tools.' },
                'patnapur-gp': { saturation: 60.14, lagDays: 32.0, target: 63.0, progressDetail: 'Requires improved reporting infrastructure. Manual processing slows data.' },
                'mankuguda-gp': { saturation: 65.8, lagDays: 48.0, target: 75.0, progressDetail: 'Beneficiary identification ongoing, but home visits are often delayed.' },
                'jainoor-gp': { saturation: 90.0, lagDays: 12.0, target: 94.0, progressDetail: 'Strong community engagement and high program acceptance.' },
                'ramnayak-thanda-gp': { saturation: 85.0, lagDays: 18.0, target: 90.0, progressDetail: 'Consistent progress, but some tribal area beneficiaries are hard to track.' },
                'marlawai-gp': { saturation: 78.0, lagDays: 25.0, target: 83.0, progressDetail: 'Minor operational delays in supply delivery and reporting.' },
                'jandaguda-gp': { saturation: 60.0, lagDays: 35.0, target: 68.0, progressDetail: 'Requires improved reporting quality. Digital literacy is a barrier.' },
                'nazurulnagar-gp': { saturation: 92.0, lagDays: 8.0, target: 95.0, progressDetail: 'Focus on last-mile connectivity. Excellent and timely reporting.' },
                'kadamba-gp': { saturation: 88.0, lagDays: 10.0, target: 92.0, progressDetail: 'Consistent progress, but data entry errors observed.' },
                'mosam-gp': { saturation: 70.0, lagDays: 30.0, target: 75.0, progressDetail: 'Beneficiary identification ongoing. Training for new workers needed.' },
                'ramnagar-n-gp': { saturation: 80.0, lagDays: 20.0, target: 85.0, progressDetail: 'Strong community engagement. Data consolidation is moderate.' },
                'jaganathpur-gp': { saturation: 65.0, lagDays: 40.0, target: 70.0, progressDetail: 'Minor operational delays in program material distribution.' },
                'lineguda-gp': { saturation: 95.0, lagDays: 5.0, target: 98.0, progressDetail: 'Excellent outreach. Reports are highly accurate and timely.' },
                'basantinagar-gp': { saturation: 89.0, lagDays: 10.0, target: 93.0, progressDetail: 'Consistent progress, but verification of some beneficiaries is pending.' },
                'ankoda-gp': { saturation: 75.0, lagDays: 28.0, target: 80.0, progressDetail: 'Requires improved reporting. Data from field is often delayed.' },
                'vallakonda-gp': { saturation: 82.0, lagDays: 15.0, target: 87.0, progressDetail: 'Focus on last-mile connectivity. Good follow-up on cases.' },
                'burdagudem-gp': { saturation: 68.0, lagDays: 32.0, target: 73.0, progressDetail: 'Beneficiary identification ongoing. Need to improve data transmission.' },
                'regulaguda-gp': { saturation: 90.0, lagDays: 9.0, target: 94.0, progressDetail: 'Strong community engagement. Data accuracy is high.' },
                'ngos-colony-gp': { saturation: 87.0, lagDays: 12.0, target: 90.0, progressDetail: 'Consistent progress, but cross-verification takes time.' },
                'easgaon-gp': { saturation: 72.0, lagDays: 35.0, target: 78.0, progressDetail: 'Minor operational delays due to staffing shortages.' },
                'andevelly-gp': { saturation: 78.0, lagDays: 22.0, target: 83.0, progressDetail: 'Requires improved reporting. Some resistance to new digital tools.' },
                'chinthaguda-koyawagu-gp': { saturation: 63.0, lagDays: 45.0, target: 70.0, progressDetail: 'Focus on last-mile connectivity. Significant challenges in reaching remote households.' },
                'kotha-sarsala-gp': { saturation: 93.0, lagDays: 7.0, target: 96.0, progressDetail: 'Excellent outreach. Program data is very reliable.' },
                'gannaram-gp': { saturation: 88.0, lagDays: 11.0, target: 92.0, progressDetail: 'Consistent progress, but requires more training for new field staff.' },
                'raspally-gp': { saturation: 77.0, lagDays: 29.0, target: 82.0, progressDetail: 'Minor operational delays. Data collection is slow.' },
                'nagampet-gp': { saturation: 84.0, lagDays: 16.0, target: 89.0, progressDetail: 'Strong community engagement. Data reporting is on track.' },
                'bodepalle-gp': { saturation: 69.0, lagDays: 38.0, target: 74.0, progressDetail: 'Beneficiary identification ongoing. Delays in data consolidation.' },
                'bhat-palle-gp': { saturation: 91.0, lagDays: 8.0, target: 95.0, progressDetail: 'Focus on last-mile connectivity. Very timely data updates.' },
                'chinthaguda-gp': { saturation: 86.0, lagDays: 13.0, target: 90.0, progressDetail: 'Consistent progress, but some discrepancies in beneficiary data.' },
                'vanjari-gp': { saturation: 70.0, lagDays: 30.0, target: 75.0, progressDetail: 'Requires improved reporting quality. Needs more direct supervision.' },
                'durga-nagar-gp': { saturation: 79.0, lagDays: 20.0, target: 84.0, progressDetail: 'Strong community engagement. Program materials sometimes delayed.' },
                'kosini-gp': { saturation: 64.0, lagDays: 40.0, target: 70.0, progressDetail: 'Minor operational delays in program delivery and reporting.' },
                'malni-gp': { saturation: 94.0, lagDays: 6.0, target: 97.0, progressDetail: 'Excellent outreach. Reports are submitted very quickly.' },
                'metapipri-gp': { saturation: 89.0, lagDays: 9.0, target: 93.0, progressDetail: 'Consistent progress, but new staff need training on reporting.' },
                'ananthapur-gp': { saturation: 74.0, lagDays: 32.0, target: 79.0, progressDetail: 'Requires improved reporting consistency and data validation.' },
                'bolapatar-gp': { saturation: 81.0, lagDays: 17.0, target: 86.0, progressDetail: 'Focus on last-mile connectivity. Data accuracy is good.' },
                'jhari-gp': { saturation: 67.0, lagDays: 35.0, target: 72.0, progressDetail: 'Beneficiary identification ongoing. Challenges in reaching all households.' },
                'keslaguda-gp': { saturation: 90.0, lagDays: 10.0, target: 94.0, progressDetail: 'Strong community engagement. Data reflects high program adoption.' },
                'keli-b-gp': { saturation: 85.0, lagDays: 15.0, target: 90.0, progressDetail: 'Consistent progress. Some delays in procuring program materials.' },
                'modi-gp': { saturation: 69.0, lagDays: 28.0, target: 74.0, progressDetail: 'Minor operational delays in daily reporting and reconciliation.' },
                'indapur-gp': { saturation: 78.0, lagDays: 22.0, target: 83.0, progressDetail: 'Requires improved reporting frequency. Data validation is a manual process.' },
                'kothari-gp': { saturation: 63.0, lagDays: 45.0, target: 70.0, progressDetail: 'Focus on last-mile connectivity. Progress is slow in remote areas.' },
                'gondguda-gp': { saturation: 92.0, lagDays: 7.0, target: 95.0, progressDetail: 'Excellent outreach. Reports are generated promptly.' },
                'agarwada-gp': { saturation: 87.0, lagDays: 12.0, target: 91.0, progressDetail: 'Consistent progress. Some issues with beneficiary Aadhaar linking.' },
                'ringhanghat-gp': { saturation: 76.0, lagDays: 29.0, target: 81.0, progressDetail: 'Minor operational delays. Data collection tools need upgrade.' },
                'babejhari-gp': { saturation: 83.0, lagDays: 18.0, target: 88.0, progressDetail: 'Strong community engagement. Data accuracy is generally high.' },
                'devapur-gp': { saturation: 68.0, lagDays: 37.0, target: 73.0, progressDetail: 'Beneficiary identification ongoing. Challenges in accessing all households.' },
                'karanjiwada-gp': { saturation: 91.0, lagDays: 9.0, target: 95.0, progressDetail: 'Focus on last-mile connectivity. Efficient service delivery.' },
                'dhanora-gp': { saturation: 86.0, lagDays: 14.0, target: 90.0, progressDetail: 'Consistent progress. Data verification procedures are robust.' },
                'parda-gp': { saturation: 71.0, lagDays: 31.0, target: 76.0, progressDetail: 'Requires improved reporting timeliness. Training for field staff needed.' },
                'mukadhamguda-gp': { saturation: 79.0, lagDays: 21.0, target: 84.0, progressDetail: 'Strong community engagement. Program materials reach on time.' },
                'saverkeda-gp': { saturation: 65.0, lagDays: 42.0, target: 70.0, progressDetail: 'Minor operational delays. Data entry has some backlog.' },
                'sakada-gp': { saturation: 93.0, lagDays: 6.0, target: 96.0, progressDetail: 'Excellent outreach. Data reports are highly reliable.' },
                'jhodeghat-gp': { saturation: 88.0, lagDays: 10.0, target: 92.0, progressDetail: 'Consistent progress. Some challenges in capturing real-time data.' },
                'goyagaon-gp': { saturation: 77.0, lagDays: 28.0, target: 82.0, progressDetail: 'Minor operational delays. Need to improve data submission frequency.' },
                'kerameri-gp': { saturation: 84.0, lagDays: 16.0, target: 89.0, progressDetail: 'Strong community engagement. Data accuracy is a priority.' },
                'sangvi-gp': { saturation: 69.0, lagDays: 35.0, target: 74.0, progressDetail: 'Beneficiary identification ongoing. Data collection forms need simplification.' },
                'nishani-gp': { saturation: 90.0, lagDays: 8.0, target: 94.0, progressDetail: 'Focus on last-mile connectivity. Digital reporting is efficient.' },
                'parandholi-gp': { saturation: 85.0, lagDays: 13.0, target: 90.0, progressDetail: 'Consistent progress. Manual verification adds to data lag.' },
                'borilalguda-gp': { saturation: 70.0, lagDays: 30.0, target: 75.0, progressDetail: 'Requires improved reporting speed. Some issues with device availability.' },
                'anarpalli-gp': { saturation: 79.0, lagDays: 20.0, target: 84.0, progressDetail: 'Strong community engagement. Program awareness is good.' },
                'thummaguda-gp': { saturation: 64.0, lagDays: 40.0, target: 70.0, progressDetail: 'Minor operational delays due to network issues in field.' },
                'khairi-gp': { saturation: 94.0, lagDays: 6.0, target: 97.0, progressDetail: 'Excellent outreach. Reports are generated with minimal errors.' },
                'surdapur-gp': { saturation: 89.0, lagDays: 9.0, target: 93.0, progressDetail: 'Consistent progress, but some data needs manual cross-checking.' },
                'kannepalle-gp': { saturation: 74.0, lagDays: 32.0, target: 79.0, progressDetail: 'Requires improved reporting. Data entry personnel need more training.' },
                'thatipally-gp': { saturation: 81.0, lagDays: 17.0, target: 86.0, progressDetail: 'Focus on last-mile connectivity. Progress is solid.' },
                'thatinagar-gp': { saturation: 67.0, lagDays: 35.0, target: 72.0, progressDetail: 'Beneficiary identification ongoing. Field visits are sometimes delayed.' },
                'veerdandi-gp': { saturation: 90.0, lagDays: 10.0, target: 94.0, progressDetail: 'Strong community engagement. Timely and accurate data.' },
                'sandgoan-gp': { saturation: 85.0, lagDays: 15.0, target: 90.0, progressDetail: 'Consistent progress. Reports reflect ground reality well.' },
                'mogadhagad-gp': { saturation: 69.0, lagDays: 28.0, target: 74.0, progressDetail: 'Minor operational delays. Manual data upload is slow.' },
                'bodhampalli-gp': { saturation: 78.0, lagDays: 22.0, target: 83.0, progressDetail: 'Requires improved reporting frequency. System is not real-time.' },
                'kanki-gp': { saturation: 63.0, lagDays: 45.0, target: 70.0, progressDetail: 'Focus on last-mile connectivity. Awareness levels are low.' },
                'tumdihetty-gp': { saturation: 92.0, lagDays: 7.0, target: 95.0, progressDetail: 'Excellent outreach. Digital data capture is very effective.' },
                'veeravelly-gp': { saturation: 87.0, lagDays: 12.0, target: 91.0, progressDetail: 'Consistent progress. Data validation checks are rigorous.' },
                'nagepalli-gp': { saturation: 76.0, lagDays: 29.0, target: 81.0, progressDetail: 'Minor operational delays. Need to expedite report approvals.' },
                'kouthala-gp': { saturation: 83.0, lagDays: 18.0, target: 88.0, progressDetail: 'Strong community engagement. Data insights are actionable.' },
                'muthampet-gp': { saturation: 68.0, lagDays: 37.0, target: 73.0, progressDetail: 'Beneficiary identification ongoing. Coverage needs to expand.' },
                'gundaipeta-gp': { saturation: 91.0, lagDays: 9.0, target: 95.0, progressDetail: 'Focus on last-mile connectivity. Data reflects high program adoption.' },
                'gurudpeta-gp': { saturation: 86.0, lagDays: 14.0, target: 90.0, progressDetail: 'Consistent progress. Data submitted in batches, causing minor lags.' },
                'gudlabori-gp': { saturation: 71.0, lagDays: 31.0, target: 76.0, progressDetail: 'Requires improved reporting. Data quality issues are being addressed.' },
                'talodi-gp': { saturation: 79.0, lagDays: 21.0, target: 84.0, progressDetail: 'Strong community engagement. Service delivery is consistent.' },
                'bhalepalli-gp': { saturation: 65.0, lagDays: 42.0, target: 70.0, progressDetail: 'Minor operational delays. Remote access for data entry is challenging.' },
                'pardi-gp': { saturation: 93.0, lagDays: 6.0, target: 96.0, progressDetail: 'Excellent outreach. Reports are highly reliable and timely.' },
                'shirsha-gp': { saturation: 88.0, lagDays: 10.0, target: 92.0, progressDetail: 'Consistent progress. Some manual intervention in data processing.' },
                'navegaon-gp': { saturation: 77.0, lagDays: 28.0, target: 82.0, progressDetail: 'Minor operational delays. Need to accelerate data submission.' },
                'rollapahad-gp': { saturation: 84.0, lagDays: 16.0, target: 89.0, progressDetail: 'Strong community engagement. Data accuracy is a focus area.' },
                'rajaram-gp': { saturation: 69.0, lagDays: 35.0, target: 74.0, progressDetail: 'Beneficiary identification ongoing. Field visit data processing is slow.' },
                'khairgaon-gp': { saturation: 90.0, lagDays: 8.0, target: 94.0, progressDetail: 'Focus on last-mile connectivity. Timely and comprehensive reports.' },
                'indranagar-gp': { saturation: 85.0, lagDays: 13.0, target: 90.0, progressDetail: 'Consistent progress. Data flow from urban centers is efficient.' },
                'golleti-gp': { saturation: 70.0, lagDays: 30.0, target: 75.0, progressDetail: 'Requires improved reporting. Need to train more data entry operators.' },
                'jakkulapally-gp': { saturation: 79.0, lagDays: 20.0, target: 84.0, progressDetail: 'Strong community engagement. Data reflects high program awareness.' },
                'pasigaon-gp': { saturation: 64.0, lagDays: 40.0, target: 70.0, progressDetail: 'Minor operational delays. Challenges in data synchronization.' },
                'kondapalle-gp': { saturation: 94.0, lagDays: 6.0, target: 97.0, progressDetail: 'Excellent outreach. Data reflects high program impact.' },
                'pulikunta-gp': { saturation: 89.0, lagDays: 9.0, target: 93.0, progressDetail: 'Consistent progress. Data is robust and reliable.' },
                'laxmipur-gp': { saturation: 74.0, lagDays: 32.0, target: 79.0, progressDetail: 'Requires improved reporting. Field data collection is time-consuming.' },
                'dharmaram-gp': { saturation: 81.0, lagDays: 17.0, target: 86.0, progressDetail: 'Focus on last-mile connectivity. Program data is actionable.' },
                'madavaiguda-gp': { saturation: 67.0, lagDays: 35.0, target: 72.0, progressDetail: 'Beneficiary identification ongoing. Some issues with data accuracy.' },
                'takkallapalle-gp': { saturation: 90.0, lagDays: 10.0, target: 94.0, progressDetail: 'Strong community engagement. Reports are comprehensive.' },
                'komuravelly-gp': { saturation: 85.0, lagDays: 15.0, target: 90.0, progressDetail: 'Consistent progress. Data reflects good program implementation.' },
                'tungeda-gp': { saturation: 69.0, lagDays: 28.0, target: 74.0, progressDetail: 'Minor operational delays. Need to automate more data processes.' },
                'venkulam-gp': { saturation: 78.0, lagDays: 22.0, target: 83.0, progressDetail: 'Requires improved reporting frequency. System is prone to manual errors.' },
                'nambal-gp': { saturation: 63.0, lagDays: 45.0, target: 70.0, progressDetail: 'Focus on last-mile connectivity. Data validation is a bottleneck.' },
                'rebbana-gp': { saturation: 92.0, lagDays: 7.0, target: 95.0, progressDetail: 'Excellent outreach. Data capture is almost real-time.' },
                'gangapur-gp': { saturation: 87.0, lagDays: 12.0, target: 91.0, progressDetail: 'Consistent progress. Regular data audits are in place.' },
                'narayanpur-gp': { saturation: 76.0, lagDays: 29.0, target: 81.0, progressDetail: 'Minor operational delays. Need to improve data entry speed.' },
                'kistapur-gp': { saturation: 83.0, lagDays: 18.0, target: 88.0, progressDetail: 'Strong community engagement. Data utilization for planning is effective.' },
                'khairguda-gp': { saturation: 68.0, lagDays: 37.0, target: 73.0, progressDetail: 'Beneficiary identification ongoing. Challenges in reporting remote visits.' },
                'itikyalapahad-gp': { saturation: 91.0, lagDays: 9.0, target: 95.0, progressDetail: 'Focus on last-mile connectivity. Data accuracy is a hallmark.' },
                'karjepally-gp': { saturation: 86.0, lagDays: 14.0, target: 90.0, progressDetail: 'Consistent progress. Data submission is timely.' },
                'vempalle-gp': { saturation: 71.0, lagDays: 31.0, target: 76.0, progressDetail: 'Requires improved reporting tools. Manual data processing is slow.' },
                'parigaon-gp': { saturation: 79.0, lagDays: 21.0, target: 84.0, progressDetail: 'Strong community engagement. Program data reflects good adoption.' },
                'achelly-gp': { saturation: 65.0, lagDays: 42.0, target: 70.0, progressDetail: 'Minor operational delays. Data consolidation is a complex task.' },
                'chintakunta-gp': { saturation: 93.0, lagDays: 6.0, target: 96.0, progressDetail: 'Excellent outreach. Reports are highly reliable.' },
                'loanvelli-gp': { saturation: 88.0, lagDays: 10.0, target: 92.0, progressDetail: 'Consistent progress. Data verification requires field visits.' },
                'medipally-gp': { saturation: 77.0, lagDays: 28.0, target: 82.0, progressDetail: 'Minor operational delays. Need to improve data feedback loops.' },
                'dhorpalle-gp': { saturation: 84.0, lagDays: 16.0, target: 89.0, progressDetail: 'Strong community engagement. Data insights are immediate.' },
                'venkatraopet-gp': { saturation: 69.0, lagDays: 35.0, target: 74.0, progressDetail: 'Beneficiary identification ongoing. Data collection is slow.' },
                'sirpur-t-gp': { saturation: 90.0, lagDays: 8.0, target: 94.0, progressDetail: 'Focus on last-mile connectivity. Reports are comprehensive.' },
                'navegoan-gp': { saturation: 85.0, lagDays: 13.0, target: 90.0, progressDetail: 'Consistent progress. Data reflects strong local ownership.' },
                'hudkili-gp': { saturation: 70.0, lagDays: 30.0, target: 75.0, progressDetail: 'Requires improved reporting infrastructure. Manual processing is a barrier.' },
                'cheelapalle-gp': { saturation: 79.0, lagDays: 20.0, target: 84.0, progressDetail: 'Strong community engagement. Program data is accurate.' },
                'bhupalapatnam-gp': { saturation: 64.0, lagDays: 40.0, target: 70.0, progressDetail: 'Minor operational delays. Challenges in data synchronization.' },
                'bandair-gp': { saturation: 94.0, lagDays: 6.0, target: 97.0, progressDetail: 'Excellent outreach. Reports provide actionable intelligence.' },
                'shettihadapnur-gp': { saturation: 89.0, lagDays: 9.0, target: 93.0, progressDetail: 'Consistent progress. Data validation is a continuous process.' },
                'pamulawada-gp': { saturation: 74.0, lagDays: 32.0, target: 79.0, progressDetail: 'Requires improved reporting. Need to train more field supervisors.' },
                'burnoor-b-gp': { saturation: 81.0, lagDays: 17.0, target: 86.0, progressDetail: 'Focus on last-mile connectivity. Program data is generally reliable.' },
                'raghapur-gp': { saturation: 67.0, lagDays: 35.0, target: 72.0, progressDetail: 'Beneficiary identification ongoing. Some data collection challenges.' },
                'dhanora-p-gp': { saturation: 90.0, lagDays: 10.0, target: 94.0, progressDetail: 'Strong community engagement. Data reporting is very efficient.' },
                'powarguda-gp': { saturation: 85.0, lagDays: 15.0, target: 90.0, progressDetail: 'Consistent progress. Data reflects local program success.' },
                'pangidi-gp': { saturation: 69.0, lagDays: 28.0, target: 74.0, progressDetail: 'Minor operational delays. Data submission needs monitoring.' },
                'phullara-gp': { saturation: 78.0, lagDays: 22.0, target: 83.0, progressDetail: 'Requires improved reporting frequency. Data audits are essential.' },
                'kohinoor-b-gp': { saturation: 63.0, lagDays: 45.0, target: 70.0, progressDetail: 'Focus on last-mile connectivity. Data capturing is difficult.' },
                'seethagondi-gp': { saturation: 92.0, lagDays: 7.0, target: 95.0, progressDetail: 'Excellent outreach. Real-time data updates are possible.' },
                'babjipet-gp': { saturation: 87.0, lagDays: 12.0, target: 91.0, progressDetail: 'Consistent progress. Data quality is good.' },
                'netnoor-gp': { saturation: 76.0, lagDays: 29.0, target: 81.0, progressDetail: 'Minor operational delays. Need to accelerate data processing.' },
                'mahagaon-gp': { saturation: 83.0, lagDays: 18.0, target: 88.0, progressDetail: 'Strong community engagement. Program data is well-maintained.' },
                'sirpur-u-gp': { saturation: 68.0, lagDays: 37.0, target: 73.0, progressDetail: 'Beneficiary identification ongoing. Reporting infrastructure is weak.' },
                'mandaguda-gp': { saturation: 91.0, lagDays: 9.0, target: 95.0, progressDetail: 'Focus on last-mile connectivity. Data reflects high program adoption.' },
                'chintapally-gp': { saturation: 86.0, lagDays: 14.0, target: 90.0, progressDetail: 'Consistent progress. Data validation is a continuous process.' },
                'goperanaguguda-gp': { saturation: 71.0, lagDays: 31.0, target: 76.0, progressDetail: 'Requires improved reporting tools. Manual data reconciliation needed.' },
                'thalandi-gp': { saturation: 79.0, lagDays: 21.0, target: 84.0, progressDetail: 'Strong community engagement. Program materials are distributed on time.' },
                'govena-gp': { saturation: 65.0, lagDays: 42.0, target: 70.0, progressDetail: 'Minor operational delays. Data entry has some backlog.' },
                'tiryani-gp': { saturation: 93.0, lagDays: 6.0, target: 96.0, progressDetail: 'Excellent outreach. Digital data capture is very effective.' },
                'mesramguda-gp': { saturation: 88.0, lagDays: 10.0, target: 92.0, progressDetail: 'Consistent progress. Data insights are actionable.' },
                'koutagam-gp': { saturation: 77.0, lagDays: 28.0, target: 82.0, progressDetail: 'Minor operational delays. Need to improve data submission frequency.' },
                'ullipitadorli-gp': { saturation: 84.0, lagDays: 16.0, target: 89.0, progressDetail: 'Strong community engagement. Data accuracy is a focus area.' },
                'pangidi-madra-gp': { saturation: 69.0, lagDays: 35.0, target: 74.0, progressDetail: 'Beneficiary identification ongoing. Data collection forms need simplification.' },
                'morriguda-gp': { saturation: 90.0, lagDays: 8.0, target: 94.0, progressDetail: 'Focus on last-mile connectivity. Digital reporting is efficient.' },
                'gudipet-gp': { saturation: 85.0, lagDays: 13.0, target: 90.0, progressDetail: 'Consistent progress. Manual data validation is slow.' },
                'goyagoan-gp': { saturation: 70.0, lagDays: 30.0, target: 75.0, progressDetail: 'Requires improved reporting speed. Some issues with device availability.' },
                'markaguda-gp': { saturation: 79.0, lagDays: 20.0, target: 84.0, progressDetail: 'Strong community engagement. Program awareness is good.' },
                'nayakapuguda-gp': { saturation: 64.0, lagDays: 40.0, target: 70.0, progressDetail: 'Minor operational delays due to network issues in field.' },
                'rajaguda-gp': { saturation: 94.0, lagDays: 6.0, target: 97.0, progressDetail: 'Excellent outreach. Reports are generated with minimal errors.' },
                'bheemjiguda-gp': { saturation: 89.0, lagDays: 9.0, target: 93.0, progressDetail: 'Consistent progress, but some data needs manual cross-checking.' },
                'rompalle-gp': { saturation: 74.0, lagDays: 32.0, target: 79.0, progressDetail: 'Requires improved reporting. Data entry personnel need more training.' },
                'mulkalamanda-gp': { saturation: 81.0, lagDays: 17.0, target: 86.0, progressDetail: 'Focus on last-mile connectivity. Progress is solid.' },
                'khariguda-gp': { saturation: 67.0, lagDays: 35.0, target: 72.0, progressDetail: 'Beneficiary identification ongoing. Field visits are sometimes delayed.' },
                'godelpalle-gp': { saturation: 90.0, lagDays: 10.0, target: 94.0, progressDetail: 'Strong community engagement. Timely and accurate data.' },
                'gambiraopet-gp': { saturation: 85.0, lagDays: 15.0, target: 90.0, progressDetail: 'Consistent progress. Reports reflect ground reality well.' },
                'devaiguda-gp': { saturation: 69.0, lagDays: 28.0, target: 74.0, progressDetail: 'Minor operational delays. Manual data upload is slow.' },
                'edulapahad-gp': { saturation: 78.0, lagDays: 22.0, target: 83.0, progressDetail: 'Requires improved reporting frequency. System is not real-time.' },
                'manikyapur-gp': { saturation: 63.0, lagDays: 45.0, target: 70.0, progressDetail: 'Focus on last-mile connectivity. Awareness levels are low.' },
                'sungapur-gp': { saturation: 92.0, lagDays: 7.0, target: 95.0, progressDetail: 'Excellent outreach. Digital data capture is very effective.' },
                'ginnedari-gp': { saturation: 87.0, lagDays: 12.0, target: 91.0, progressDetail: 'Consistent progress. Data validation checks are rigorous.' },
                'mangi-gp': { saturation: 76.0, lagDays: 29.0, target: 81.0, progressDetail: 'Minor operational delays. Need to expedite report approvals.' },
                'samela-gp': { saturation: 83.0, lagDays: 18.0, target: 88.0, progressDetail: 'Strong community engagement. Data insights are actionable.' },
                'bambara-gp': { saturation: 68.0, lagDays: 37.0, target: 73.0, progressDetail: 'Beneficiary identification ongoing. Coverage needs to expand.' },
                'komatiguda-gp': { saturation: 91.0, lagDays: 9.0, target: 95.0, progressDetail: 'Focus on last-mile connectivity. Data reflects high program adoption.' },
                'pataguda-gp': { saturation: 86.0, lagDays: 14.0, target: 90.0, progressDetail: 'Consistent progress. Data submitted in batches, causing minor lags.' },
                'sonapur-gp': { saturation: 71.0, lagDays: 31.0, target: 76.0, progressDetail: 'Requires improved reporting. Data quality issues are being addressed.' },
                'bendera-gp': { saturation: 79.0, lagDays: 21.0, target: 84.0, progressDetail: 'Strong community engagement. Service delivery is consistent.' },
                'tejapur-gp': { saturation: 65.0, lagDays: 42.0, target: 70.0, progressDetail: 'Minor operational delays. Remote access for data entry is challenging.' },
                'chichupally-gp': { saturation: 93.0, lagDays: 6.0, target: 96.0, progressDetail: 'Excellent outreach. Reports are highly reliable and timely.' },
                'jambuldhari-gp': { saturation: 88.0, lagDays: 10.0, target: 92.0, progressDetail: 'Consistent progress. Some manual intervention in data processing.' },
                'pippergonadi-gp': { saturation: 77.0, lagDays: 28.0, target: 82.0, progressDetail: 'Minor operational delays. Need to accelerate data submission.' },
                'dabha-gp': { saturation: 84.0, lagDays: 16.0, target: 89.0, progressDetail: 'Strong community engagement. Data accuracy is a focus area.' },
                'navedhari-gp': { saturation: 69.0, lagDays: 35.0, target: 74.0, progressDetail: 'Beneficiary identification ongoing. Field visit data processing is slow.' },
                'velgi-gp': { saturation: 90.0, lagDays: 8.0, target: 94.0, progressDetail: 'Focus on last-mile connectivity. Timely and comprehensive reports.' },
                'wankidi-kalan-gp': { saturation: 85.0, lagDays: 13.0, target: 90.0, progressDetail: 'Consistent progress. Data flow from urban centers is efficient.' },
                'indhani-gp': { saturation: 70.0, lagDays: 30.0, target: 75.0, progressDetail: 'Requires improved reporting. Need to train more data entry operators.' },
                'doddiguda-gp': { saturation: 79.0, lagDays: 20.0, target: 84.0, progressDetail: 'Strong community engagement. Program data reflects high awareness.' },
                'jaithpur-gp': { saturation: 64.0, lagDays: 40.0, target: 70.0, progressDetail: 'Minor operational delays. Challenges in data synchronization.' },
                'khirdi-gp': { saturation: 94.0, lagDays: 6.0, target: 97.0, progressDetail: 'Excellent outreach. Reports provide actionable intelligence.' },
                'sawathi-gp': { saturation: 89.0, lagDays: 9.0, target: 93.0, progressDetail: 'Consistent progress. Data validation is a continuous process.' },
                'khamana-gp': { saturation: 74.0, lagDays: 32.0, target: 79.0, progressDetail: 'Requires improved reporting. Need to train more field supervisors.' },
                'chowpanguda-gp': { saturation: 81.0, lagDays: 17.0, target: 86.0, progressDetail: 'Focus on last-mile connectivity. Program data is generally reliable.' }
            }
        }
    },
    {
        id: 'pradhan-mantri-matru-vandana-yojana',
        name: 'Pradhan Mantri Matru Vandana Yojana (PMMVY)',
        description: 'A maternity benefit program providing cash incentives for pregnant and lactating women. Aims to compensate for wage loss and promote health-seeking behaviors. Data influenced by MCH Kit distribution and beneficiary registrations from DMHO reports.',
        overall: { saturation: 75.04, lagDays: 29.0, target: 79.0, progressDetail: 'Payment disbursement delays due to documentation and verification issues at district level. Field registration is consistent.' },
        geographicalData: {
            districts: {
                'kb-asifabad': { saturation: 76.11, lagDays: 25.0, target: 80.0, progressDetail: 'Good progress in beneficiary enrollment. Verification pipeline is slower.' },
                'mancherial': { saturation: 72.82, lagDays: 37.0, target: 77.0, progressDetail: 'Needs focus on accelerating payment processing and reducing documentation errors.' },
                'nirmal': { saturation: 74.22, lagDays: 39.0, target: 81.0, progressDetail: 'Beneficiary identification ongoing, but challenges in linking bank accounts.' }
            },
            mandals: {
                'asifabad-m': { saturation: 77.38, lagDays: 27.0, target: 81.0, progressDetail: 'Requires improved reporting on payment statuses. Enrollment is good.' },
                'bejjur-m': { saturation: 66.86, lagDays: 52.0, target: 74.0, progressDetail: 'Consistent progress in registrations, but significant lag in payment initiation.' },
                'dahegaon-m': { saturation: 56.44, lagDays: 24.0, target: 63.0, progressDetail: 'Beneficiary identification ongoing, low saturation due to awareness gaps.' },
                'jainoor-m': { saturation: 63.45, lagDays: 34.0, target: 71.0, progressDetail: 'Focus on last-mile connectivity. Payment delays impact satisfaction.' },
                'kagaznagar-m': { saturation: 73.19, lagDays: 44.0, target: 80.0, progressDetail: 'Strong community engagement, but documentation processing is slow.' },
                'kerameri-m': { saturation: 67.57, lagDays: 37.0, target: 72.0, progressDetail: 'Requires improved reporting on payment disbursement. Verification is a bottleneck.' },
                'kouthala-m': { saturation: 58.29, lagDays: 57.0, target: 63.0, progressDetail: 'Minor operational delays. Very high lag in payments.' },
                'rebbena-m': { saturation: 57.65, lagDays: 24.0, target: 66.0, progressDetail: 'Consistent progress in registrations. Need to expedite bank account linking.' },
                'sirpur-t-m': { saturation: 78.47, lagDays: 21.0, target: 83.0, progressDetail: 'Minor operational delays. Payment processing is relatively efficient.' },
                'sirpur-u-m': { saturation: 74.56, lagDays: 28.0, target: 81.0, progressDetail: 'Beneficiary identification ongoing. Some delays in final approval.' },
                'tiryani-m': { saturation: 84.14, lagDays: 37.0, target: 86.0, progressDetail: 'Focus on last-mile connectivity. Payment delays are a concern.' },
                'wankidi-m': { saturation: 75.39, lagDays: 56.0, target: 77.0, progressDetail: 'Strong community engagement, but significant lag in payment disbursement.' },
                'lingapur-m': { saturation: 80.23, lagDays: 36.0, target: 87.0, progressDetail: 'Requires improved reporting on payment completion. Verification needs acceleration.' },
                'penchicalpet-m': { saturation: 73.34, lagDays: 45.0, target: 78.0, progressDetail: 'Beneficiary identification ongoing. Administrative bottlenecks.' },
                'chintalamanepally-m': { saturation: 62.59, lagDays: 38.0, target: 69.0, progressDetail: 'Minor operational delays. Need to boost awareness for scheme uptake.' }
            },
            gps: {
                'kosara-gp': { saturation: 80.89, lagDays: 47.0, target: 86.0, progressDetail: 'Requires improved reporting on payment status. High lag.' },
                'malangondi-gp': { saturation: 78.1, lagDays: 30.0, target: 85.0, progressDetail: 'Beneficiary identification ongoing. Manual verification slows process.' },
                'venkatapur-gp': { saturation: 70.52, lagDays: 32.0, target: 78.0, progressDetail: 'Consistent progress in enrollment. Payment processing is slower.' },
                'tumpalli-gp': { saturation: 53.98, lagDays: 24.0, target: 63.0, progressDetail: 'Focus on last-mile connectivity. Low registration due to awareness.' },
                'appapally-gp': { saturation: 84.45, lagDays: 26.0, target: 88.0, progressDetail: 'Strong community engagement. Good registration rates.' },
                'koutaguda-gp': { saturation: 73.53, lagDays: 38.0, target: 78.0, progressDetail: 'Requires improved reporting on document submission. High lag.' },
                'chilatiguda-gp': { saturation: 62.27, lagDays: 36.0, target: 69.0, progressDetail: 'Minor operational delays. Verification of documents is slow.' },
                'motuguda-gp': { saturation: 70.16, lagDays: 53.0, target: 75.0, progressDetail: 'Consistent progress in registrations, but very high payment lag.' },
                'govindapur-gp': { saturation: 66.88, lagDays: 37.0, target: 72.0, progressDetail: 'Beneficiary identification ongoing. Payments have significant delays.' },
                'padibanda-gp': { saturation: 53.69, lagDays: 48.0, target: 63.0, progressDetail: 'Minor operational delays. Very low saturation and high lag.' },
                'manikguda-gp': { saturation: 80.7, lagDays: 20.0, target: 84.0, progressDetail: 'Strong community engagement. Payment processing is efficient here.' },
                'babapur-gp': { saturation: 85.94, lagDays: 15.0, target: 86.0, progressDetail: 'Requires improved reporting on payment receipt. High registration.' },
                'wavudam-gp': { saturation: 74.21, lagDays: 54.0, target: 80.0, progressDetail: 'Focus on last-mile connectivity. Very high payment lag.' },
                'ankusapur-gp': { saturation: 61.34, lagDays: 52.0, target: 68.0, progressDetail: 'Beneficiary identification ongoing. Payments are severely delayed.' },
                'ada-dasnapur-gp': { saturation: 87.27, lagDays: 24.0, target: 92.0, progressDetail: 'Consistent progress in registration. Verification needs acceleration.' },
                'gundi-gp': { saturation: 60.15, lagDays: 14.0, target: 67.0, progressDetail: 'Minor operational delays. Good on-site registration rates.' },
                'yellaram-gp': { saturation: 68.35, lagDays: 53.0, target: 75.0, progressDetail: 'Requires improved reporting. Payments are significantly lagged.' },
                'routsankepalle-gp': { saturation: 83.49, lagDays: 28.0, target: 85.0, progressDetail: 'Strong community engagement. Good progress on registrations.' },
                'buruguda-gp': { saturation: 65.52, lagDays: 36.0, target: 71.0, progressDetail: 'Minor operational delays. Delays in linking Aadhaar with bank accounts.' },
                'mowad-gp': { saturation: 60.62, lagDays: 23.0, target: 67.0, progressDetail: 'Beneficiary identification ongoing. Verification bottlenecks.' },
                'ada-gp': { saturation: 60.27, lagDays: 56.0, target: 69.0, progressDetail: 'Focus on last-mile connectivity. Very high payment lag affecting uptake.' },
                'chirrakunta-gp': { saturation: 76.54, lagDays: 45.0, target: 82.0, progressDetail: 'Requires improved reporting. Manual verification slows progress.' },
                'asifabad-gp': { saturation: 84.27, lagDays: 42.0, target: 86.0, progressDetail: 'Strong community engagement. Urban area payment delays.' },
                'chorpalli-gp': { saturation: 64.91, lagDays: 55.0, target: 70.0, progressDetail: 'Minor operational delays. Severe payment lag impacting saturation.' },
                'edulawada-gp': { saturation: 73.15, lagDays: 26.0, target: 78.0, progressDetail: 'Consistent progress in registrations. Payments are reasonably on time.' },
                'rahapally-gp': { saturation: 80.89, lagDays: 39.0, target: 84.0, progressDetail: 'Beneficiary identification ongoing. High payment processing lag.' },
                'saleguda-gp': { saturation: 78.36, lagDays: 12.0, target: 84.0, progressDetail: 'Focus on last-mile connectivity. Good payment and registration rate.' },
                'andhugulaguda-gp': { saturation: 58.74, lagDays: 30.0, target: 65.0, progressDetail: 'Requires improved reporting. Payment verification challenges.' },
                'outsarangipalle-gp': { saturation: 55.43, lagDays: 25.0, target: 63.0, progressDetail: 'Consistent progress, but overall low uptake due to payment delays.' },
                'kukuda-gp': { saturation: 68.75, lagDays: 29.0, target: 73.0, progressDetail: 'Minor operational delays. Payment processing needs streamlining.' },
                'pothepally-gp': { saturation: 69.95, lagDays: 12.0, target: 74.0, progressDetail: 'Beneficiary identification ongoing. Timely payments here.' },
                'kushnepalle-gp': { saturation: 69.95, lagDays: 55.0, target: 75.0, progressDetail: 'Strong community engagement, but very high payment lag.' },
                'kuntalamanepalli-gp': { saturation: 73.09, lagDays: 22.0, target: 79.0, progressDetail: 'Minor operational delays. Documentation errors causing delays.' },
                'mogavelly-gp': { saturation: 79.8, lagDays: 57.0, target: 86.0, progressDetail: 'Requires improved reporting on payments. Critical lag.' },
                'rebbena-gp': { saturation: 71.07, lagDays: 49.0, target: 76.0, progressDetail: 'Consistent progress, but significant payment disbursement delays.' },
                'sushmir-gp': { saturation: 84.45, lagDays: 25.0, target: 91.0, progressDetail: 'Focus on last-mile connectivity. Good overall performance.' },
                'somini-gp': { saturation: 61.21, lagDays: 17.0, target: 68.0, progressDetail: 'Beneficiary identification ongoing. Payment issues affecting uptake.' },
                'ambhaghat-gp': { saturation: 71.39, lagDays: 35.0, target: 78.0, progressDetail: 'Strong community engagement. Verification process is slow.' },
                'thummalaguda-gp': { saturation: 63.58, lagDays: 58.0, target: 70.0, progressDetail: 'Minor operational delays. Very high payment lag.' },
                'talai-gp': { saturation: 56.76, lagDays: 20.0, target: 66.0, progressDetail: 'Consistent progress, but manual verification of documents causes lag.' },
                'bareguda-gp': { saturation: 71.93, lagDays: 25.0, target: 79.0, progressDetail: 'Requires improved reporting. Data reconciliation is slow.' },
                'katepalli-gp': { saturation: 61.64, lagDays: 11.0, target: 66.0, progressDetail: 'Focus on last-mile connectivity. Good registration rates.' },
                'marthadi-gp': { saturation: 62.77, lagDays: 27.0, target: 69.0, progressDetail: 'Beneficiary identification ongoing. Payments sometimes delayed.' },
                'bejjur-gp': { saturation: 83.21, lagDays: 39.0, target: 87.0, progressDetail: 'Strong community engagement. High payment processing time.' },
                'munjampalle-gp': { saturation: 58.74, lagDays: 20.0, target: 66.0, progressDetail: 'Minor operational delays. Payment process needs acceleration.' },
                'papanpet-gp': { saturation: 80.07, lagDays: 36.0, target: 85.0, progressDetail: 'Consistent progress. Documentation issues lead to payment lags.' },
                'sulugupalli-gp': { saturation: 66.7, lagDays: 12.0, target: 74.0, progressDetail: 'Requires improved reporting. Payments are on time here.' },
                'pedda-siddapur-gp': { saturation: 55.85, lagDays: 52.0, target: 63.0, progressDetail: 'Focus on last-mile connectivity. Very high lag impacting saturation.' },
                'lambadiguda-gp': { saturation: 70.83, lagDays: 45.0, target: 75.0, progressDetail: 'Strong community engagement, but manual verification of payments is slow.' },
                'chinnaraspalle-gp': { saturation: 60.03, lagDays: 18.0, target: 67.0, progressDetail: 'Minor operational delays. Good on-site registration.' },
                'borlakunta-gp': { saturation: 82.25, lagDays: 29.0, target: 88.0, progressDetail: 'Consistent progress. Digital payment tracking needs improvement.' },
                'kothmir-gp': { saturation: 59.8, lagDays: 44.0, target: 67.0, progressDetail: 'Beneficiary identification ongoing. High payment lag.' },
                'pesarikunta-gp': { saturation: 81.33, lagDays: 34.0, target: 86.0, progressDetail: 'Strong community engagement. Data reflects good payment rates.' },
                'digida-gp': { saturation: 73.7, lagDays: 40.0, target: 79.0, progressDetail: 'Minor operational delays. Challenges in data verification.' },
                'dahegaon-gp': { saturation: 62.4, lagDays: 21.0, target: 69.0, progressDetail: 'Consistent progress. Need to improve payment notification system.' },
                'chandrapalle-gp': { saturation: 58.94, lagDays: 15.0, target: 65.0, progressDetail: 'Requires improved reporting. Payments are mostly on time.' },
                'rampur-gp': { saturation: 69.41, lagDays: 10.0, target: 76.0, progressDetail: 'Focus on last-mile connectivity. Excellent payment processing here.' },
                'motleguda-gp': { saturation: 74.07, lagDays: 54.0, target: 80.0, progressDetail: 'Strong community engagement. Very high payment processing lag.' },
                'kamarpally-gp': { saturation: 74.77, lagDays: 42.0, target: 81.0, progressDetail: 'Minor operational delays. Data collection for payments is slow.' },
                'gerre-gp': { saturation: 61.27, lagDays: 23.0, target: 68.0, progressDetail: 'Consistent progress. Payment verification takes time.' },
                'kalwada-gp': { saturation: 75.69, lagDays: 37.0, target: 82.0, progressDetail: 'Beneficiary identification ongoing. Payment disbursement needs acceleration.' },
                'laggaon-gp': { saturation: 79.52, lagDays: 56.0, target: 86.0, progressDetail: 'Requires improved reporting. Critical lag in payments impacting new registrations.' },
                'ainam-gp': { saturation: 65.34, lagDays: 20.0, target: 72.0, progressDetail: 'Focus on last-mile connectivity. Payment delays affecting enrollment.' },
                'vodduguda-gp': { saturation: 79.4, lagDays: 17.0, target: 85.0, progressDetail: 'Strong community engagement. Timely payment processing.' },
                'hathni-gp': { saturation: 75.8, lagDays: 51.0, target: 80.0, progressDetail: 'Minor operational delays. Very high payment lag.' },
                'kunchavelli-gp': { saturation: 60.19, lagDays: 24.0, target: 67.0, progressDetail: 'Consistent progress. Manual bank linking causes delays.' },
                'chowka-gp': { saturation: 59.81, lagDays: 48.0, target: 66.0, progressDetail: 'Requires improved reporting. High payment lag.' },
                'beebra-gp': { saturation: 72.76, lagDays: 32.0, target: 79.0, progressDetail: 'Focus on last-mile connectivity. Payment processing is slow.' },
                'pp-rao-colony-gp': { saturation: 61.26, lagDays: 38.0, target: 68.0, progressDetail: 'Strong community engagement. Payment verification process is manual.' },
                'ityal-gp': { saturation: 76.01, lagDays: 27.0, target: 81.0, progressDetail: 'Minor operational delays. Payment processing is moderate.' },
                'kharji-gp': { saturation: 80.9, lagDays: 12.0, target: 85.0, progressDetail: 'Consistent progress. Payments are almost always on time.' },
                'girvelli-gp': { saturation: 65.02, lagDays: 54.0, target: 72.0, progressDetail: 'Beneficiary identification ongoing. Critical payment lag.' },
                'bhamanagar-gp': { saturation: 60.9, lagDays: 34.0, target: 67.0, progressDetail: 'Strong community engagement. Payment transfer delays.' },
                'pocham-loddi-gp': { saturation: 73.19, lagDays: 17.0, target: 78.0, progressDetail: 'Minor operational delays. Good payment processing.' },
                'raoji-guda-gp': { saturation: 59.94, lagDays: 49.0, target: 66.0, progressDetail: 'Requires improved reporting. Very high payment lag.' },
                'dubbaguda-gp': { saturation: 75.47, lagDays: 20.0, target: 80.0, progressDetail: 'Focus on last-mile connectivity. Smooth payment distribution.' },
                'ushegaon-gp': { saturation: 64.6, lagDays: 35.0, target: 71.0, progressDetail: 'Strong community engagement. Payments have moderate lag.' },
                'power-guda-gp': { saturation: 70.36, lagDays: 40.0, target: 75.0, progressDetail: 'Minor operational delays. Payments are consistently delayed.' },
                'andh-guda-gp': { saturation: 70.18, lagDays: 23.0, target: 75.0, progressDetail: 'Consistent progress. Payment verification takes time.' },
                'maniguda-gp': { saturation: 59.72, lagDays: 45.0, target: 66.0, progressDetail: 'Requires improved reporting. Payments are significantly lagged.' },
                'panapatar-gp': { saturation: 58.74, lagDays: 17.0, target: 65.0, progressDetail: 'Focus on last-mile connectivity. Good registration, but payment delays.' },
                'jamni-gp': { saturation: 77.94, lagDays: 30.0, target: 83.0, progressDetail: 'Strong community engagement. Payments are sometimes delayed.' },
                'para-gp': { saturation: 81.71, lagDays: 12.0, target: 87.0, progressDetail: 'Minor operational delays. Payment processing is efficient.' },
                'chinthakara-gp': { saturation: 63.85, lagDays: 50.0, target: 70.0, progressDetail: 'Consistent progress. Very high payment lag.' },
                'rasimatta-gp': { saturation: 71.39, lagDays: 46.0, target: 77.0, progressDetail: 'Requires improved reporting. Payments are consistently late.' },
                'gudamamda-gp': { saturation: 77.6, lagDays: 24.0, target: 83.0, progressDetail: 'Focus on last-mile connectivity. Payments have moderate lag.' },
                'bhusimetta-gp': { saturation: 70.09, lagDays: 16.0, target: 76.0, progressDetail: 'Strong community engagement. Payments are mostly on time.' },
                'gowri-kolamguda-gp': { saturation: 62.4, lagDays: 37.0, target: 69.0, progressDetail: 'Minor operational delays. Payments consistently delayed.' },
                'shivnoor-gp': { saturation: 75.78, lagDays: 51.0, target: 81.0, progressDetail: 'Consistent progress. Critical payment lag.' },
                'addesara-gp': { saturation: 70.21, lagDays: 21.0, target: 75.0, progressDetail: 'Requires improved reporting. Payment verification takes time.' },
                'daboli-gp': { saturation: 60.59, lagDays: 15.0, target: 67.0, progressDetail: 'Focus on last-mile connectivity. Payments are largely on time.' },
                'ashapalle-gp': { saturation: 66.38, lagDays: 45.0, target: 73.0, progressDetail: 'Strong community engagement. High payment lag.' },
                'jamgaon-gp': { saturation: 78.89, lagDays: 28.0, target: 84.0, progressDetail: 'Minor operational delays. Payment processing needs review.' },
                'patnapur-gp': { saturation: 59.8, lagDays: 33.0, target: 66.0, progressDetail: 'Consistent progress. Manual payment reconciliation.' },
                'mankuguda-gp': { saturation: 68.42, lagDays: 14.0, target: 74.0, progressDetail: 'Requires improved reporting. Payments generally on time.' },
                'sirpur-u-gp': { saturation: 81.0, lagDays: 21.0, target: 86.0, progressDetail: 'Consistent progress. Payment verification takes time.' },
                'mandaguda-gp': { saturation: 68.0, lagDays: 15.0, target: 73.0, progressDetail: 'Focus on last-mile connectivity. Payments mostly on time.' }
            }
        }
    },
    {
        id: 'anganwadi-services-scheme',
        name: 'Anganwadi Services Scheme',
        description: 'Provides supplementary nutrition, preschool education, and primary healthcare to children and mothers. Core activities include daily attendance tracking and food distribution. Data from DWO reports on AWC opened status and attendance.',
        overall: { saturation: 92.0, lagDays: 8.0, target: 95.0, progressDetail: 'Excellent outreach and high service uptake. Minor challenges in new AWC construction completion and digital reporting adoption.' },
        geographicalData: {
            districts: {
                'kb-asifabad': { saturation: 95.0, lagDays: 5.0, target: 97.0, progressDetail: 'Consistent high performance in AWC operations and beneficiary coverage.' },
                'mancherial': { saturation: 91.0, lagDays: 10.0, target: 93.0, progressDetail: 'Steady progress, minor reporting delays due to remote areas.' },
                'nirmal': { saturation: 90.0, lagDays: 13.0, target: 92.0, progressDetail: 'Good outreach, some staffing challenges impacting daily operations and reporting frequency.' }
            },
            mandals: {
                'asifabad-m': { saturation: 96.0, lagDays: 4.0, target: 98.0, progressDetail: 'Exceptional performance in AWC opening and attendance submission. Model Mandal.' },
                'bejjur-m': { saturation: 88.0, lagDays: 15.0, target: 92.0, progressDetail: 'Needs focus on remote AWCs connectivity for digital reporting and supply chain.' },
                'dahegaon-m': { saturation: 92.0, lagDays: 8.0, target: 95.0, progressDetail: 'Consistent high saturation in daily services and timely reporting.' },
                'jainoor-m': { saturation: 89.0, lagDays: 12.0, target: 92.0, progressDetail: 'Steady progress in attendance. Minor issues with AWC infrastructure.' },
                'kagaznagar-m': { saturation: 90.0, lagDays: 10.0, target: 93.0, progressDetail: 'Good progress in nutrition distribution and preschool education enrollment.' },
                'kerameri-m': { saturation: 94.0, lagDays: 6.0, target: 96.0, progressDetail: 'High attendance rates and effective service delivery.' },
                'kouthala-m': { saturation: 93.0, lagDays: 7.0, target: 95.0, progressDetail: 'Strong community participation and support for AWCs.' },
                'rebbena-m': { saturation: 87.0, lagDays: 18.0, target: 90.0, progressDetail: 'Some delays in facility upgrades and timely report submissions.' },
                'sirpur-t-m': { saturation: 96.0, lagDays: 4.0, target: 98.0, progressDetail: 'Model performance in AWC management and reporting efficiency.' },
                'sirpur-u-m': { saturation: 88.0, lagDays: 15.0, target: 92.0, progressDetail: 'Requires improved reporting quality from field workers. Data validation takes time.' },
                'tiryani-m': { saturation: 90.0, lagDays: 11.0, target: 93.0, progressDetail: 'Consistent service delivery. Minor challenges in biometric attendance.' },
                'wankidi-m': { saturation: 85.0, lagDays: 20.0, target: 88.0, progressDetail: 'Focus needed on remote AWC accessibility and digital connectivity for reporting.' },
                'lingapur-m': { saturation: 82.0, lagDays: 25.0, target: 85.0, progressDetail: 'Progress is slow; need intensified efforts in AWC outreach and staffing.' },
                'penchicalpet-m': { saturation: 89.0, lagDays: 13.0, target: 92.0, progressDetail: 'Good progress in beneficiary enrollment and service uptake.' },
                'chintalamanepally-m': { saturation: 91.0, lagDays: 9.0, target: 94.0, progressDetail: 'Strong community support ensuring AWC functionality and data flow.' }
            },
            gps: {
                'kosara-gp': { saturation: 98.0, lagDays: 2.0, target: 99.0, progressDetail: 'Exemplary performance in all AWC services and near real-time reporting.' },
                'malangondi-gp': { saturation: 92.0, lagDays: 8.0, target: 95.0, progressDetail: 'High attendance, timely reporting. Consistently meets program goals.' },
                'venkatapur-gp': { saturation: 85.0, lagDays: 20.0, target: 90.0, progressDetail: 'Needs minor improvements in infrastructure and digital reporting rates.' },
                'tumpalli-gp': { saturation: 90.0, lagDays: 10.0, target: 93.0, progressDetail: 'Consistent nutrition distribution and preschool attendance. Good data accuracy.' },
                'appapally-gp': { saturation: 95.0, lagDays: 5.0, target: 97.0, progressDetail: 'Very high beneficiary satisfaction and effective daily operations.' },
                'koutaguda-gp': { saturation: 88.0, lagDays: 15.0, target: 92.0, progressDetail: 'Requires focused home visits and improved digital attendance recording.' },
                'chilatiguda-gp': { saturation: 91.0, lagDays: 9.0, target: 94.0, progressDetail: 'Good preschool enrollment and high engagement in daily activities.' },
                'motuguda-gp': { saturation: 86.0, lagDays: 17.0, target: 90.0, progressDetail: 'Addressing minor staffing issues. Reporting consistency can improve.' },
                'govindapur-gp': { saturation: 93.0, lagDays: 7.0, target: 96.0, progressDetail: 'Excellent overall delivery. Timely data synchronization.' },
                'padibanda-gp': { saturation: 87.0, lagDays: 14.0, target: 91.0, progressDetail: 'Steady progress, good reporting. Some delays in photo uploads.' },
                'manikguda-gp': { saturation: 94.0, lagDays: 6.0, target: 97.0, progressDetail: 'High impact on child health and nutrition. Efficient data flow.' },
                'babapur-gp': { saturation: 89.0, lagDays: 11.0, target: 93.0, progressDetail: 'Consistent service uptake. Minor manual data reconciliation needed.' },
                'wavudam-gp': { saturation: 82.0, lagDays: 25.0, target: 85.0, progressDetail: 'Needs improved access for beneficiaries due to remote location. Reporting lags.' },
                'ankusapur-gp': { saturation: 90.0, lagDays: 10.0, target: 93.0, progressDetail: 'Strong community engagement. Data reflects high program adoption.' },
                'ada-dasnapur-gp': { saturation: 85.0, lagDays: 18.0, target: 88.0, progressDetail: 'Requires minor data entry improvements. Data verification needs focus.' },
                'gundi-gp': { saturation: 93.0, lagDays: 7.0, target: 96.0, progressDetail: 'Excellent service coverage. Timely and accurate reporting.' },
                'yellaram-gp': { saturation: 88.0, lagDays: 12.0, target: 92.0, progressDetail: 'Consistent follow-up activities. Data capture is robust.' },
                'routsankepalle-gp': { saturation: 91.0, lagDays: 9.0, target: 94.0, progressDetail: 'High community participation. Real-time data updates for daily activities.' },
                'buruguda-gp': { saturation: 86.0, lagDays: 15.0, target: 90.0, progressDetail: 'Addressing reporting discrepancies. Needs better data validation tools.' },
                'mowad-gp': { saturation: 94.0, lagDays: 6.0, target: 97.0, progressDetail: 'Model AWC practices. Highly efficient in data submission.' },
                'ada-gp': { saturation: 89.0, lagDays: 11.0, target: 93.0, progressDetail: 'Good supplementary nutrition delivery. Data flow is consistent.' },
                'chirrakunta-gp': { saturation: 83.0, lagDays: 22.0, target: 86.0, progressDetail: 'Needs focus on preschool attendance. Some manual data entry processes persist.' },
                'asifabad-gp': { saturation: 90.0, lagDays: 10.0, target: 93.0, progressDetail: 'Strong urban outreach. Digital reporting adoption is high.' },
                'chorpalli-gp': { saturation: 85.0, lagDays: 18.0, target: 88.0, progressDetail: 'Requires improved infrastructure for better service and data capture.' },
                'edulawada-gp': { saturation: 92.0, lagDays: 8.0, target: 95.0, progressDetail: 'Excellent overall performance. Data reflects comprehensive coverage.' },
                'rahapally-gp': { saturation: 87.0, lagDays: 14.0, target: 91.0, progressDetail: 'Consistent service delivery. Minor delays in monthly summary reports.' },
                'saleguda-gp': { saturation: 94.0, lagDays: 6.0, target: 97.0, progressDetail: 'High impact on health outcomes. Data is very reliable.' },
                'andhugulaguda-gp': { saturation: 89.0, lagDays: 11.0, target: 93.0, progressDetail: 'Good community response. Data quality remains consistent.' },
                'outsarangipalle-gp': { saturation: 84.0, lagDays: 19.0, target: 87.0, progressDetail: 'Needs targeted home visits. Challenges in digital reporting adoption.' },
                'kukuda-gp': { saturation: 91.0, lagDays: 9.0, target: 94.0, progressDetail: 'Strong implementation. Data is consistently updated.' },
                'pothepally-gp': { saturation: 86.0, lagDays: 15.0, target: 90.0, progressDetail: 'Consistent high saturation. Data validation is a manual process.' },
                'kushnepalle-gp': { saturation: 93.0, lagDays: 7.0, target: 96.0, progressDetail: 'Excellent overall delivery. Real-time data insights available.' },
                'kuntalamanepalli-gp': { saturation: 88.0, lagDays: 12.0, target: 92.0, progressDetail: 'Strong community engagement. Data accuracy is a priority.' },
                'mogavelly-gp': { saturation: 90.0, lagDays: 10.0, target: 93.0, progressDetail: 'High beneficiary enrollment. Timely data submissions.' },
                'rebbena-gp': { saturation: 85.0, lagDays: 18.0, target: 88.0, progressDetail: 'Requires minor infrastructure support for better connectivity. Data lags slightly.' },
                'sushmir-gp': { saturation: 92.0, lagDays: 8.0, target: 95.0, progressDetail: 'Excellent overall performance. Robust data collection system.' },
                'somini-gp': { saturation: 87.0, lagDays: 14.0, target: 91.0, progressDetail: 'Consistent service delivery. Some manual verification needed for reports.' },
                'ambhaghat-gp': { saturation: 94.0, lagDays: 6.0, target: 97.0, progressDetail: 'High impact on health outcomes. Data is highly reliable.' },
                'thummalaguda-gp': { saturation: 89.0, lagDays: 11.0, target: 93.0, progressDetail: 'Good community response. Minor delays in consolidating monthly reports.' },
                'talai-gp': { saturation: 84.0, lagDays: 19.0, target: 87.0, progressDetail: 'Needs targeted home visits. Challenges in digital data transmission.' },
                'bareguda-gp': { saturation: 91.0, lagDays: 9.0, target: 94.0, progressDetail: 'Strong implementation. Data accuracy and timeliness are key strengths.' },
                'katepalli-gp': { saturation: 86.0, lagDays: 15.0, target: 90.0, progressDetail: 'Consistent high saturation. Data is well-maintained.' },
                'marthadi-gp': { saturation: 93.0, lagDays: 7.0, target: 96.0, progressDetail: 'Excellent overall delivery. Real-time insights are available.' },
                'bejjur-gp': { saturation: 88.0, lagDays: 12.0, target: 92.0, progressDetail: 'Strong community engagement. Data reflects positive program impact.' },
                'munjampalle-gp': { saturation: 90.0, lagDays: 10.0, target: 93.0, progressDetail: 'High beneficiary enrollment. Data submission is timely.' },
                'papanpet-gp': { saturation: 85.0, lagDays: 18.0, target: 88.0, progressDetail: 'Requires minor infrastructure support. Some reporting inconsistencies.' },
                'sulugupalli-gp': { saturation: 92.0, lagDays: 8.0, target: 95.0, progressDetail: 'Excellent overall performance. Data validates broad coverage.' },
                'pedda-siddapur-gp': { saturation: 87.0, lagDays: 14.0, target: 91.0, progressDetail: 'Consistent service delivery. Some manual data entry leads to delays.' },
                'lambadiguda-gp': { saturation: 94.0, lagDays: 6.0, target: 97.0, progressDetail: 'High impact on health outcomes. Robust data collection.' },
                'chinnaraspalle-gp': { saturation: 89.0, lagDays: 11.0, target: 93.0, progressDetail: 'Good community response. Data quality is consistently high.' },
                'borlakunta-gp': { saturation: 84.0, lagDays: 19.0, target: 87.0, progressDetail: 'Needs targeted home visits. Data transmission faces network issues.' },
                'kothmir-gp': { saturation: 91.0, lagDays: 9.0, target: 94.0, progressDetail: 'Strong implementation. Data is consistently updated.' },
                'pesarikunta-gp': { saturation: 86.0, lagDays: 15.0, target: 90.0, progressDetail: 'Consistent high saturation. Data validation is thorough.' },
                'digida-gp': { saturation: 93.0, lagDays: 7.0, target: 96.0, progressDetail: 'Excellent overall delivery. Real-time data for daily activities.' },
                'dahegaon-gp': { saturation: 88.0, lagDays: 12.0, target: 92.0, progressDetail: 'Strong community engagement. Data reflects positive program impact.' },
                'chandrapalle-gp': { saturation: 90.0, lagDays: 10.0, target: 93.0, progressDetail: 'High beneficiary enrollment. Data submission is generally timely.' },
                'rampur-gp': { saturation: 85.0, lagDays: 18.0, target: 88.0, progressDetail: 'Requires minor infrastructure support. Some inconsistencies in reporting.' },
                'motleguda-gp': { saturation: 92.0, lagDays: 8.0, target: 95.0, progressDetail: 'Excellent overall performance. Data validates comprehensive coverage.' },
                'kamarpally-gp': { saturation: 87.0, lagDays: 14.0, target: 91.0, progressDetail: 'Consistent service delivery. Minor delays in monthly summary reports.' },
                'gerre-gp': { saturation: 94.0, lagDays: 6.0, target: 97.0, progressDetail: 'High impact on health outcomes. Data is highly reliable.' },
                'kalwada-gp': { saturation: 89.0, lagDays: 11.0, target: 93.0, progressDetail: 'Good community response. Data quality remains consistently high.' },
                'laggaon-gp': { saturation: 84.0, lagDays: 19.0, target: 87.0, progressDetail: 'Needs targeted home visits. Data transmission faces network issues.' },
                'ainam-gp': { saturation: 91.0, lagDays: 9.0, target: 94.0, progressDetail: 'Strong implementation. Data accuracy and timeliness are key strengths.' },
                'vodduguda-gp': { saturation: 86.0, lagDays: 15.0, target: 90.0, progressDetail: 'Consistent high saturation. Data is well-maintained.' },
                'hathni-gp': { saturation: 93.0, lagDays: 7.0, target: 96.0, progressDetail: 'Excellent overall delivery. Real-time insights are available.' },
                'kunchavelli-gp': { saturation: 88.0, lagDays: 12.0, target: 92.0, progressDetail: 'Strong community engagement. Data reflects positive program impact.' },
                'chowka-gp': { saturation: 90.0, lagDays: 10.0, target: 93.0, progressDetail: 'High beneficiary enrollment. Data submission is timely.' },
                'beebra-gp': { saturation: 85.0, lagDays: 18.0, target: 88.0, progressDetail: 'Requires minor infrastructure support. Some reporting inconsistencies.' },
                'pp-rao-colony-gp': { saturation: 92.0, lagDays: 8.0, target: 95.0, progressDetail: 'Excellent overall performance. Data validates comprehensive coverage.' },
                'ityal-gp': { saturation: 87.0, lagDays: 14.0, target: 91.0, progressDetail: 'Consistent service delivery. Minor delays in monthly summary reports.' },
                'kharji-gp': { saturation: 94.0, lagDays: 6.0, target: 97.0, progressDetail: 'High impact on health outcomes. Data is highly reliable.' },
                'girvelli-gp': { saturation: 89.0, lagDays: 11.0, target: 93.0, progressDetail: 'Good community response. Data quality remains consistently high.' },
                'bhamanagar-gp': { saturation: 84.0, lagDays: 19.0, target: 87.0, progressDetail: 'Needs targeted home visits. Data transmission faces network issues.' },
                'pocham-loddi-gp': { saturation: 91.0, lagDays: 9.0, target: 94.0, progressDetail: 'Strong implementation. Data is consistently updated.' },
                'raoji-guda-gp': { saturation: 86.0, lagDays: 15.0, target: 90.0, progressDetail: 'Consistent high saturation. Data validation is thorough.' },
                'dubbaguda-gp': { saturation: 93.0, lagDays: 7.0, target: 96.0, progressDetail: 'Excellent overall delivery. Real-time data for daily activities.' },
                'ushegaon-gp': { saturation: 88.0, lagDays: 12.0, target: 92.0, progressDetail: 'Strong community engagement. Data reflects positive program impact.' },
                'power-guda-gp': { saturation: 90.0, lagDays: 10.0, target: 93.0, progressDetail: 'High beneficiary enrollment. Data submission is timely.' },
                'andh-guda-gp': { saturation: 85.0, lagDays: 18.0, target: 88.0, progressDetail: 'Requires minor infrastructure support. Some inconsistencies in reporting.' },
                'maniguda-gp': { saturation: 92.0, lagDays: 8.0, target: 95.0, progressDetail: 'Excellent overall performance. Data validates comprehensive coverage.' },
                'panapatar-gp': { saturation: 87.0, lagDays: 14.0, target: 91.0, progressDetail: 'Consistent service delivery. Minor delays in monthly summary reports.' },
                'jamni-gp': { saturation: 94.0, lagDays: 6.0, target: 97.0, progressDetail: 'High impact on health outcomes. Data is highly reliable.' },
                'para-gp': { saturation: 89.0, lagDays: 11.0, target: 93.0, progressDetail: 'Good community response. Data quality remains consistently high.' },
                'chinthakara-gp': { saturation: 84.0, lagDays: 19.0, target: 87.0, progressDetail: 'Needs targeted home visits. Data transmission faces network issues.' },
                'rasimatta-gp': { saturation: 91.0, lagDays: 9.0, target: 94.0, progressDetail: 'Strong implementation. Data accuracy and timeliness are key strengths.' },
                'gudamamda-gp': { saturation: 86.0, lagDays: 15.0, target: 90.0, progressDetail: 'Consistent high saturation. Data is well-maintained.' },
                'bhusimetta-gp': { saturation: 93.0, lagDays: 7.0, target: 96.0, progressDetail: 'Excellent overall delivery. Real-time insights are available.' },
                'gowri-kolamguda-gp': { saturation: 88.0, lagDays: 12.0, target: 92.0, progressDetail: 'Strong community engagement. Data reflects positive program impact.' }
            }
        }
    },
    {
        id: 'mission-shakti-sumbal',
        name: 'Mission Shakti (Sambal)',
        description: 'A sub-scheme of Mission Shakti, focusing on women empowerment, safety, and protection through awareness and support services. Data influenced by DWO reports on activities and awareness campaigns.',
        overall: { saturation: 80.0, lagDays: 25.0, target: 85.0, progressDetail: 'Awareness campaigns are picking up, but participant conversion needs boost. Support services are consistent but verification has delays.' },
        geographicalData: {
            districts: {
                'kb-asifabad': { saturation: 82.0, lagDays: 20.0, target: 87.0, progressDetail: 'Good progress in workshops and counseling sessions. Case closure rates are moderate.' },
                'mancherial': { saturation: 77.0, lagDays: 30.0, target: 82.0, progressDetail: 'Needs more active community outreach programs. Reporting of case outcomes needs acceleration.' },
                'nirmal': { saturation: 75.0, lagDays: 37.0, target: 80.0, progressDetail: 'Challenges in reaching remote areas for awareness drives. Data from field is often delayed.' }
            },
            mandals: {
                'asifabad-m': { saturation: 85.0, lagDays: 18.0, target: 90.0, progressDetail: 'Strong participation in legal awareness camps. Case registration is high.' },
                'bejjur-m': { saturation: 70.0, lagDays: 45.0, target: 75.0, progressDetail: 'Significant lag in support group formation and reporting their activities.' },
                'dahegaon-m': { saturation: 78.0, lagDays: 25.0, target: 83.0, progressDetail: 'Steady progress in helpline utilization. Reporting on calls is timely.' },
                'jainoor-m': { saturation: 65.0, lagDays: 38.0, target: 70.0, progressDetail: 'Requires more grassroots level awareness. Data on new beneficiaries is slow.' },
                'kagaznagar-m': { saturation: 80.0, lagDays: 23.0, target: 85.0, progressDetail: 'Good engagement in urban areas. Case follow-up data has minor lags.' },
                'kerameri-m': { saturation: 72.0, lagDays: 32.0, target: 77.0, progressDetail: 'Challenges in ensuring follow-ups for reported cases. Data shows pending actions.' },
                'kouthala-m': { saturation: 83.0, lagDays: 20.0, target: 88.0, progressDetail: 'High success rate in rescue operations. Data reflects quick response.' },
                'rebbena-m': { saturation: 68.0, lagDays: 40.0, target: 73.0, progressDetail: 'Needs capacity building for local volunteers. Data shows delays in training reports.' },
                'sirpur-t-m': { saturation: 88.0, lagDays: 15.0, target: 92.0, progressDetail: 'Strong collaboration with local police. Case resolution data is good.' },
                'sirpur-u-m': { saturation: 80.0, lagDays: 25.0, target: 85.0, progressDetail: 'Consistent progress in urban outreach. Data on awareness campaign reach is good.' },
                'tiryani-m': { saturation: 75.0, lagDays: 30.0, target: 80.0, progressDetail: 'Requires intensified awareness in tribal belts. Data from these regions is sparse.' },
                'wankidi-m': { saturation: 62.0, lagDays: 50.0, target: 68.0, progressDetail: 'Very high lag in case resolution and reporting. Critical intervention needed.' },
                'lingapur-m': { saturation: 70.0, lagDays: 35.0, target: 75.0, progressDetail: 'Needs improved coordination with other departments. Data shows inter-departmental delays.' },
                'penchicalpet-m': { saturation: 81.0, lagDays: 22.0, target: 86.0, progressDetail: 'Good response to emergency calls. Case data is updated promptly.' },
                'chintalamanepally-m': { saturation: 76.0, lagDays: 28.0, target: 81.0, progressDetail: 'Steady progress in women safety initiatives. Reporting on outcomes is consistent.' }
            },
            gps: {
                'kosara-gp': { saturation: 88.0, lagDays: 15.0, target: 90.0, progressDetail: 'Consistent progress in legal awareness. Data on participation is strong.' },
                'malangondi-gp': { saturation: 75.0, lagDays: 30.0, target: 80.0, progressDetail: 'Needs more active community participation. Follow-up data has some lag.' },
                'venkatapur-gp': { saturation: 60.0, lagDays: 45.0, target: 68.0, progressDetail: 'Significant lag in support group formation and reporting. Requires targeted intervention.' },
                'tumpalli-gp': { saturation: 82.0, lagDays: 20.0, target: 87.0, progressDetail: 'Good helpline utilization. Data on calls and resolutions is good.' },
                'appapally-gp': { saturation: 90.0, lagDays: 10.0, target: 93.0, progressDetail: 'Excellent community engagement. Event data is captured timely.' },
                'koutaguda-gp': { saturation: 70.0, lagDays: 35.0, target: 75.0, progressDetail: 'Requires improved reporting from ground workers on awareness activities.' },
                'chilatiguda-gp': { saturation: 78.0, lagDays: 25.0, target: 83.0, progressDetail: 'Steady progress in self-defense training. Participant data is solid.' },
                'motuguda-gp': { saturation: 65.0, lagDays: 40.0, target: 70.0, progressDetail: 'Needs more targeted awareness campaigns. Data shows low outreach in specific pockets.' },
                'govindapur-gp': { saturation: 85.0, lagDays: 18.0, target: 90.0, progressDetail: 'Strong women’s group formation. Data on group meetings is consistent.' },
                'padibanda-gp': { saturation: 72.0, lagDays: 33.0, target: 77.0, progressDetail: 'Addressing logistical challenges in support service delivery. Reporting delays.' },
                'manikguda-gp': { saturation: 89.0, lagDays: 12.0, target: 92.0, progressDetail: 'High satisfaction among beneficiaries. Data accurately reflects program impact.' },
                'babapur-gp': { saturation: 76.0, lagDays: 28.0, target: 81.0, progressDetail: 'Consistent follow-up on cases. Reporting on case status is timely.' },
                'wavudam-gp': { saturation: 61.0, lagDays: 48.0, target: 68.0, progressDetail: 'Critical need for increased awareness. Data shows limited knowledge of services.' },
                'ankusapur-gp': { saturation: 84.0, lagDays: 19.0, target: 89.0, progressDetail: 'Good outreach in rural areas. Data on rural beneficiaries is growing.' },
                'ada-dasnapur-gp': { saturation: 70.0, lagDays: 35.0, target: 75.0, progressDetail: 'Requires more inter-departmental coordination. Data shows cross-functional delays.' },
                'gundi-gp': { saturation: 78.0, lagDays: 22.0, target: 83.0, progressDetail: 'Steady progress in dispute resolution. Data on resolved cases is good.' },
                'yellaram-gp': { saturation: 63.0, lagDays: 42.0, target: 70.0, progressDetail: 'Needs increased visibility of services. Awareness data shows gaps.' },
                'routsankepalle-gp': { saturation: 89.0, lagDays: 11.0, target: 92.0, progressDetail: 'Strong community leadership in women safety. Incident reporting is timely.' },
                'buruguda-gp': { saturation: 75.0, lagDays: 30.0, target: 80.0, progressDetail: 'Consistent response to gender-based violence. Data accuracy is high.' },
                'mowad-gp': { saturation: 60.0, lagDays: 45.0, target: 68.0, progressDetail: 'High lag in reporting, needs more trust-building in the community.' },
                'ada-gp': { saturation: 86.0, lagDays: 17.0, target: 90.0, progressDetail: 'Good support for women in distress. Case management data is strong.' },
                'chirrakunta-gp': { saturation: 72.0, lagDays: 33.0, target: 77.0, progressDetail: 'Addressing challenges in legal aid accessibility. Data shows usage patterns.' },
                'asifabad-gp': { saturation: 85.0, lagDays: 18.0, target: 90.0, progressDetail: 'Strong urban center for women’s safety. Data reflects high service demand.' },
                'chorpalli-gp': { saturation: 68.0, lagDays: 37.0, target: 73.0, progressDetail: 'Needs improved coordination with police. Data on joint operations is limited.' },
                'edulawada-gp': { saturation: 80.0, lagDays: 25.0, target: 85.0, progressDetail: 'Steady progress in awareness programs. Participant data is growing.' },
                'rahapally-gp': { saturation: 70.0, lagDays: 35.0, target: 75.0, progressDetail: 'Requires more proactive community outreach. Data shows lower event participation.' },
                'saleguda-gp': { saturation: 88.0, lagDays: 12.0, target: 92.0, progressDetail: 'Excellent community response for support services. Data validates effectiveness.' },
                'andhugulaguda-gp': { saturation: 74.0, lagDays: 29.0, target: 79.0, progressDetail: 'Consistent victim support. Data on survivor assistance is comprehensive.' },
                'outsarangipalle-gp': { saturation: 60.0, lagDays: 48.0, target: 68.0, progressDetail: 'High lag in service delivery, needs intervention. Data shows low case follow-up.' },
                'kukuda-gp': { saturation: 82.0, lagDays: 20.0, target: 87.0, progressDetail: 'Good progress in establishing safe spaces. Usage data is increasing.' },
                'pothepally-gp': { saturation: 69.0, lagDays: 35.0, target: 74.0, progressDetail: 'Needs improved follow-up mechanisms. Data indicates cases closing slowly.' },
                'kushnepalle-gp': { saturation: 75.0, lagDays: 30.0, target: 80.0, progressDetail: 'Steady progress in awareness and protection. Program data is solid.' },
                'kuntalamanepalli-gp': { saturation: 62.0, lagDays: 45.0, target: 69.0, progressDetail: 'Requires intensified efforts for safety awareness. Data shows limited campaign reach.' },
                'mogavelly-gp': { saturation: 80.0, lagDays: 25.0, target: 85.0, progressDetail: 'Good collaboration with local bodies. Data on joint initiatives is robust.' },
                'rebbena-gp': { saturation: 67.0, lagDays: 38.0, target: 73.0, progressDetail: 'Needs more resources for support camps. Data shows limited camp frequency.' },
                'sushmir-gp': { saturation: 73.0, lagDays: 32.0, target: 78.0, progressDetail: 'Consistent progress in safety net programs. Data indicates stable performance.' },
                'somini-gp': { saturation: 60.0, lagDays: 42.0, target: 67.0, progressDetail: 'High lag, requires direct intervention. Data shows challenges in reaching beneficiaries.' },
                'ambhaghat-gp': { saturation: 88.0, lagDays: 12.0, target: 92.0, progressDetail: 'Excellent safety initiatives. Data consistently high for outreach.' },
                'thummalaguda-gp': { saturation: 74.0, lagDays: 29.0, target: 79.0, progressDetail: 'Steady progress in protection services. Data submission is timely.' },
                'talai-gp': { saturation: 61.0, lagDays: 48.0, target: 68.0, progressDetail: 'Needs improved communication and trust-building. Data shows underreporting.' },
                'bareguda-gp': { saturation: 82.0, lagDays: 20.0, target: 87.0, progressDetail: 'Good victim support. Data reflects successful case handling.' },
                'katepalli-gp': { saturation: 69.0, lagDays: 35.0, target: 74.0, progressDetail: 'Requires more localized safety plans. Data collection is challenging.' },
                'marthadi-gp': { saturation: 75.0, lagDays: 30.0, target: 80.0, progressDetail: 'Consistent response to emergency cases. Data on response time is good.' },
                'bejjur-gp': { saturation: 62.0, lagDays: 40.0, target: 69.0, progressDetail: 'Needs more resources for awareness. Data shows low campaign attendance.' },
                'munjampalle-gp': { saturation: 83.0, lagDays: 28.0, target: 88.0, progressDetail: 'Strong community collaboration. Data on joint programs is consistent.' },
                'papanpet-gp': { saturation: 69.0, lagDays: 33.0, target: 74.0, progressDetail: 'Minor delays in support service delivery. Data updates are slow.' },
                'sulugupalli-gp': { saturation: 74.0, lagDays: 14.0, target: 79.0, progressDetail: 'Consistent legal aid support. Data on legal advice cases is timely.' },
                'pedda-siddapur-gp': { saturation: 61.0, lagDays: 45.0, target: 68.0, progressDetail: 'Requires intensified safety awareness campaigns. Data shows low beneficiary knowledge.' },
                'lambadiguda-gp': { saturation: 80.0, lagDays: 20.0, target: 85.0, progressDetail: 'Good outreach in remote areas. Data on tribal beneficiaries needs improvement.' },
                'chinnaraspalle-gp': { saturation: 67.0, lagDays: 35.0, target: 73.0, progressDetail: 'Needs better follow-up on reported incidents. Data indicates incomplete resolutions.' },
                'borlakunta-gp': { saturation: 73.0, lagDays: 40.0, target: 78.0, progressDetail: 'Steady progress in protective services. Data collection is manual.' },
                'kothmir-gp': { saturation: 60.0, lagDays: 23.0, target: 67.0, progressDetail: 'Minor delays in awareness material distribution. Data shows outreach challenges.' },
                'pesarikunta-gp': { saturation: 82.0, lagDays: 17.0, target: 87.0, progressDetail: 'Strong community engagement in safety programs. Data accuracy is high.' },
                'digida-gp': { saturation: 69.0, lagDays: 35.0, target: 74.0, progressDetail: 'Requires more local volunteers. Data shows limited new volunteer registrations.' },
                'dahegaon-gp': { saturation: 74.0, lagDays: 40.0, target: 79.0, progressDetail: 'Consistent response to community needs. Data on participation is solid.' },
                'chandrapalle-gp': { saturation: 61.0, lagDays: 28.0, target: 68.0, progressDetail: 'Minor delays in support camps. Data shows low camp attendance.' },
                'rampur-gp': { saturation: 80.0, lagDays: 22.0, target: 85.0, progressDetail: 'Good progress in women safety initiatives. Data is mostly real-time.' },
                'motleguda-gp': { saturation: 67.0, lagDays: 45.0, target: 73.0, progressDetail: 'Needs better data on incident reporting. Data shows underreporting of minor incidents.' },
                'kamarpally-gp': { saturation: 73.0, lagDays: 19.0, target: 78.0, progressDetail: 'Steady progress in legal aid provision. Data indicates efficient legal support.' },
                'gerre-gp': { saturation: 60.0, lagDays: 33.0, target: 67.0, progressDetail: 'Requires more focused awareness on rights. Data shows gaps in knowledge.' },
                'kalwada-gp': { saturation: 69.0, lagDays: 38.0, target: 74.0, progressDetail: 'Consistent support for vulnerable women. Data indicates consistent follow-up.' },
                'laggaon-gp': { saturation: 77.0, lagDays: 12.0, target: 82.0, progressDetail: 'Minor delays in awareness material distribution. Data shows good campaign reach.' },
                'ainam-gp': { saturation: 63.0, lagDays: 50.0, target: 70.0, progressDetail: 'Requires significant intervention for safety. Data shows poor service uptake.' },
                'vodduguda-gp': { saturation: 71.0, lagDays: 46.0, target: 76.0, progressDetail: 'Consistent efforts in protection services. Data reflects stable operations.' },
                'hathni-gp': { saturation: 78.0, lagDays: 24.0, target: 83.0, progressDetail: 'Good community response to safety issues. Data accuracy is good.' },
                'kunchavelli-gp': { saturation: 65.0, lagDays: 16.0, target: 72.0, progressDetail: 'Needs more training for local support groups. Data shows limited training participation.' },
                'chowka-gp': { saturation: 72.0, lagDays: 37.0, target: 77.0, progressDetail: 'Steady progress in legal awareness camps. Data shows consistent event hosting.' },
                'beebra-gp': { saturation: 60.0, lagDays: 51.0, target: 67.0, progressDetail: 'High lag, critical need for intervention. Data indicates low service utilization.' },
                'pp-rao-colony-gp': { saturation: 81.0, lagDays: 21.0, target: 86.0, progressDetail: 'Good collaboration with local law enforcement. Data on joint actions is timely.' },
                'ityal-gp': { saturation: 68.0, lagDays: 15.0, target: 73.0, progressDetail: 'Needs improved follow-up on reported incidents. Data shows incomplete case closures.' },
                'kharji-gp': { saturation: 75.0, lagDays: 30.0, target: 80.0, progressDetail: 'Consistent support for victims. Data shows stable victim assistance.' },
                'girvelli-gp': { saturation: 62.0, lagDays: 40.0, target: 69.0, progressDetail: 'Requires more awareness about available services. Data shows low scheme knowledge.' },
                'bhamanagar-gp': { saturation: 83.0, lagDays: 28.0, target: 88.0, progressDetail: 'Strong community engagement in safety programs. Data accurately reflects initiatives.' },
                'pocham-loddi-gp': { saturation: 69.0, lagDays: 33.0, target: 74.0, progressDetail: 'Minor delays in emergency response. Data indicates minor delays in rapid action.' },
                'raoji-guda-gp': { saturation: 74.0, lagDays: 14.0, target: 79.0, progressDetail: 'Consistent support for distressed women. Data shows timely legal aid.' },
                'dubbaguda-gp': { saturation: 61.0, lagDays: 45.0, target: 68.0, progressDetail: 'Needs more support for vulnerable women. Data indicates challenges in reaching all.' },
                'ushegaon-gp': { saturation: 80.0, lagDays: 20.0, target: 85.0, progressDetail: 'Good outreach in remote areas. Data is reliable.' },
                'power-guda-gp': { saturation: 67.0, lagDays: 35.0, target: 73.0, progressDetail: 'Requires improved data collection on beneficiaries. Data shows missing fields.' },
                'andh-guda-gp': { saturation: 73.0, lagDays: 40.0, target: 78.0, progressDetail: 'Steady progress in self-defense training. Data indicates consistent training sessions.' },
                'maniguda-gp': { saturation: 60.0, lagDays: 23.0, target: 67.0, progressDetail: 'Minor delays in awareness material provision. Data shows limited distribution.' },
                'panapatar-gp': { saturation: 82.0, lagDays: 17.0, target: 87.0, progressDetail: 'Strong community engagement in safety awareness. Data shows high participation.' },
                'jamni-gp': { saturation: 69.0, lagDays: 35.0, target: 74.0, progressDetail: 'Requires more local support groups. Data indicates slow group formation.' },
                'para-gp': { saturation: 74.0, lagDays: 40.0, target: 79.0, progressDetail: 'Consistent protection efforts. Data reflects stable program operations.' },
                'chinthakara-gp': { saturation: 61.0, lagDays: 28.0, target: 68.0, progressDetail: 'Minor delays in support group meetings. Data indicates irregular meetings.' },
                'rasimatta-gp': { saturation: 80.0, lagDays: 22.0, target: 85.0, progressDetail: 'Good progress in addressing violence against women. Data is accurate.' },
                'gudamamda-gp': { saturation: 67.0, lagDays: 45.0, target: 73.0, progressDetail: 'Needs more resources for counseling services. Data shows resource scarcity.' }
            }
        }
    },
    {
        id: 'mission-shakti-samarthya',
        name: 'Mission Shakti (Samarthya)',
        description: 'Another sub-scheme of Mission Shakti, focusing on empowerment through skill development, vocational training, and entrepreneurship support. Data influenced by DWO reports on activities and outreach.',
        overall: { saturation: 60.0, lagDays: 40.0, target: 70.0, progressDetail: 'Newer scheme, facing challenges in beneficiary identification and training infrastructure. Placement rates need significant boost.' },
        geographicalData: {
            districts: {
                'kb-asifabad': { saturation: 58.0, lagDays: 45.0, target: 68.0, progressDetail: 'Significant lag in skill enrollment and training completion. Needs intensified efforts.' },
                'mancherial': { saturation: 63.0, lagDays: 35.0, target: 73.0, progressDetail: 'Steady progress in vocational training. Challenges in post-training placement tracking.' },
                'nirmal': { saturation: 61.0, lagDays: 50.0, target: 71.0, progressDetail: 'High lag, needs urgent focus on training centers and trainer availability. Data shows low retention.' }
            },
            mandals: {
                'asifabad-m': { saturation: 65.0, lagDays: 30.0, target: 72.0, progressDetail: 'Good enrollment in basic skill courses. Data reflects interest in entry-level skills.' },
                'bejjur-m': { saturation: 45.0, lagDays: 60.0, target: 55.0, progressDetail: 'Critical lag in skill development programs. Data shows very low participation rates.' },
                'dahegaon-m': { saturation: 58.0, lagDays: 42.0, target: 65.0, progressDetail: 'Needs more awareness about training opportunities. Data on awareness camps is limited.' },
                'jainoor-m': { saturation: 55.0, lagDays: 50.0, target: 65.0, progressDetail: 'High lag in tribal areas, requires specialized programs. Data shows specific community challenges.' },
                'kagaznagar-m': { saturation: 68.0, lagDays: 35.0, target: 75.0, progressDetail: 'Steady progress in urban skill centers. Data on course completion is moderate.' },
                'kerameri-m': { saturation: 52.0, lagDays: 55.0, target: 62.0, progressDetail: 'Significant challenges in training infrastructure. Data reflects limited facilities.' },
                'kouthala-m': { saturation: 60.0, lagDays: 40.0, target: 70.0, progressDetail: 'Needs improved access to training materials. Data indicates resource gaps.' },
                'rebbena-m': { saturation: 48.0, lagDays: 65.0, target: 58.0, progressDetail: 'Very high lag, critical intervention needed for skill development. Data shows program stagnation.' },
                'sirpur-t-m': { saturation: 70.0, lagDays: 28.0, target: 78.0, progressDetail: 'Good progress in traditional craft skill development. Data shows successful niche training.' },
                'sirpur-u-m': { saturation: 65.0, lagDays: 33.0, target: 72.0, progressDetail: 'Consistent enrollment in short-term courses. Data indicates steady uptake.' },
                'tiryani-m': { saturation: 55.0, lagDays: 48.0, target: 62.0, progressDetail: 'Challenges in retaining trainees post-completion. Data shows high dropout rates.' },
                'wankidi-m': { saturation: 40.0, lagDays: 70.0, target: 50.0, progressDetail: 'Extremely high lag, requires complete program overhaul. Data points to severe issues.' },
                'lingapur-m': { saturation: 50.0, lagDays: 60.0, target: 60.0, progressDetail: 'Needs intensive awareness campaigns for skill development. Data shows low scheme visibility.' },
                'penchicalpet-m': { saturation: 62.0, lagDays: 38.0, target: 69.0, progressDetail: 'Steady progress in livelihood generation. Data indicates early successes.' },
                'chintalamanepally-m': { saturation: 58.0, lagDays: 45.0, target: 65.0, progressDetail: 'Requires better market linkages for trained beneficiaries. Data shows poor employment rates.' }
            },
            gps: {
                'kosara-gp': { saturation: 60.0, lagDays: 45.0, target: 68.0, progressDetail: 'Needs more focus on vocational training for youth. Data indicates low youth participation.' },
                'malangondi-gp': { saturation: 50.0, lagDays: 55.0, target: 60.0, progressDetail: 'High lag, requires community mobilization. Data shows difficulty in reaching beneficiaries.' },
                'venkatapur-gp': { saturation: 40.0, lagDays: 65.0, target: 50.0, progressDetail: 'Critical need for skill development centers. Data shows very low program penetration.' },
                'tumpalli-gp': { saturation: 62.0, lagDays: 38.0, target: 69.0, progressDetail: 'Steady progress in basic literacy and numeracy skills. Data reflects consistent learning.' },
                'appapally-gp': { saturation: 70.0, lagDays: 30.0, target: 75.0, progressDetail: 'Good response to entrepreneurship workshops. Data indicates strong interest.' },
                'koutaguda-gp': { saturation: 55.0, lagDays: 50.0, target: 62.0, progressDetail: 'Challenges in training infrastructure. Data shows limited training space.' },
                'chilatiguda-gp': { saturation: 68.0, lagDays: 35.0, target: 74.0, progressDetail: 'Consistent enrollment in tailoring and crafts. Data indicates steady skill acquisition.' },
                'motuguda-gp': { saturation: 48.0, lagDays: 60.0, target: 58.0, progressDetail: 'Very high lag, critical intervention needed. Data shows very slow progress.' },
                'govindapur-gp': { saturation: 72.0, lagDays: 28.0, target: 77.0, progressDetail: 'Strong interest in digital literacy programs. Data indicates growing digital proficiency.' },
                'padibanda-gp': { saturation: 58.0, lagDays: 42.0, target: 65.0, progressDetail: 'Needs improved access to advanced skill training. Data shows basic skills only.' },
                'manikguda-gp': { saturation: 69.0, lagDays: 33.0, target: 74.0, progressDetail: 'Good uptake for livelihood support. Data reflects successful initial enterprise.' },
                'babapur-gp': { saturation: 53.0, lagDays: 50.0, target: 60.0, progressDetail: 'Significant challenges in post-training placement. Data shows high unemployment post-training.' },
                'wavudam-gp': { saturation: 45.0, lagDays: 65.0, target: 55.0, progressDetail: 'Critical need for vocational guidance. Data indicates lack of career direction.' },
                'ankusapur-gp': { saturation: 75.0, lagDays: 25.0, target: 80.0, progressDetail: 'Excellent progress in skill certification. Data shows high completion rates.' },
                'ada-dasnapur-gp': { saturation: 60.0, lagDays: 40.0, target: 68.0, progressDetail: 'Needs more customized training programs. Data shows generic training is not effective.' },
                'gundi-gp': { saturation: 68.0, lagDays: 35.0, target: 74.0, progressDetail: 'Consistent skill development workshops. Data indicates regular workshop attendance.' },
                'yellaram-gp': { saturation: 52.0, lagDays: 55.0, target: 60.0, progressDetail: 'High lag, requires direct intervention for training. Data indicates low training access.' },
                'routsankepalle-gp': { saturation: 70.0, lagDays: 30.0, target: 75.0, progressDetail: 'Steady progress in self-employment initiatives. Data shows small business growth.' },
                'buruguda-gp': { saturation: 58.0, lagDays: 45.0, target: 65.0, progressDetail: 'Needs better follow-up on trained beneficiaries. Data shows limited long-term support.' },
                'mowad-gp': { saturation: 42.0, lagDays: 68.0, target: 52.0, progressDetail: 'Extremely high lag, critical overhaul needed. Data indicates severe program shortcomings.' },
                'ada-gp': { saturation: 78.0, lagDays: 22.0, target: 83.0, progressDetail: 'Good response to entrepreneurship development. Data shows successful startups.' },
                'chirrakunta-gp': { saturation: 65.0, lagDays: 38.0, target: 72.0, progressDetail: 'Challenges in securing training infrastructure. Data indicates facility limitations.' },
                'asifabad-gp': { saturation: 70.0, lagDays: 30.0, target: 75.0, progressDetail: 'Consistent support for skill development centers. Data reflects reliable program hubs.' },
                'chorpalli-gp': { saturation: 55.0, lagDays: 50.0, target: 62.0, progressDetail: 'Needs more targeted outreach for skill training. Data shows low awareness.' },
                'edulawada-gp': { saturation: 72.0, lagDays: 28.0, target: 77.0, progressDetail: 'Steady progress in vocational education. Data indicates consistent student progress.' },
                'rahapally-gp': { saturation: 59.0, lagDays: 42.0, target: 66.0, progressDetail: 'Requires improved market linkages for trainees. Data shows limited employment options.' },
                'saleguda-gp': { saturation: 80.0, lagDays: 20.0, target: 85.0, progressDetail: 'Excellent skill enhancement programs. Data reflects high skill acquisition.' },
                'andhugulaguda-gp': { saturation: 67.0, lagDays: 35.0, target: 73.0, progressDetail: 'Needs more diversified skill courses. Data indicates limited course variety.' },
                'outsarangipalle-gp': { saturation: 73.0, lagDays: 40.0, target: 78.0, progressDetail: 'Consistent progress in livelihood generation. Data shows steady income growth.' },
                'kukuda-gp': { saturation: 60.0, lagDays: 23.0, target: 67.0, progressDetail: 'Minor delays in providing training kits. Data shows delays in material supply.' },
                'pothepally-gp': { saturation: 82.0, lagDays: 17.0, target: 87.0, progressDetail: 'Strong community engagement in skill training. Data reflects active participation.' },
                'kushnepalle-gp': { saturation: 69.0, lagDays: 35.0, target: 74.0, progressDetail: 'Requires better data on post-training employment. Data indicates gaps in tracking.' },
                'kuntalamanepalli-gp': { saturation: 74.0, lagDays: 40.0, target: 79.0, progressDetail: 'Steady progress in micro-enterprise development. Data shows slow but sure growth.' },
                'mogavelly-gp': { saturation: 61.0, lagDays: 28.0, target: 68.0, progressDetail: 'Minor delays in securing training venues. Data indicates facility limitations.' },
                'rebbena-gp': { saturation: 80.0, lagDays: 22.0, target: 85.0, progressDetail: 'Good progress in upskilling programs. Data shows successful skill improvements.' },
                'sushmir-gp': { saturation: 67.0, lagDays: 45.0, target: 73.0, progressDetail: 'Needs more resources for advanced courses. Data indicates limited advanced training.' },
                'somini-gp': { saturation: 73.0, lagDays: 19.0, target: 78.0, progressDetail: 'Consistent progress in entrepreneurship. Data reflects positive startup trends.' },
                'ambhaghat-gp': { saturation: 60.0, lagDays: 33.0, target: 67.0, progressDetail: 'Requires more tailored training for local needs. Data shows mismatch in skills.' },
                'thummalaguda-gp': { saturation: 69.0, lagDays: 38.0, target: 74.0, progressDetail: 'Steady progress in providing financial literacy. Data indicates improved financial knowledge.' },
                'talai-gp': { saturation: 77.0, lagDays: 12.0, target: 82.0, progressDetail: 'Minor delays in distributing startup kits. Data indicates some supply chain issues.' },
                'bareguda-gp': { saturation: 63.0, lagDays: 50.0, target: 70.0, progressDetail: 'High lag, critical need for skill-building initiatives. Data shows very slow program uptake.' },
                'katepalli-gp': { saturation: 71.0, lagDays: 46.0, target: 76.0, progressDetail: 'Consistent efforts in employment generation. Data shows steady job creation.' },
                'marthadi-gp': { saturation: 78.0, lagDays: 24.0, target: 83.0, progressDetail: 'Good community response to training programs. Data is accurate for attendance.' },
                'bejjur-gp': { saturation: 65.0, lagDays: 16.0, target: 72.0, progressDetail: 'Needs more training for specific trades. Data indicates limited trade variety.' },
                'munjampalle-gp': { saturation: 72.0, lagDays: 37.0, target: 77.0, progressDetail: 'Steady progress in vocational skill development. Data shows consistent skill upgrades.' },
                'papanpet-gp': { saturation: 60.0, lagDays: 51.0, target: 67.0, progressDetail: 'High lag, requires intensive outreach. Data indicates very low enrollment.' },
                'sulugupalli-gp': { saturation: 81.0, lagDays: 21.0, target: 86.0, progressDetail: 'Excellent participation in skill development workshops. Data shows strong engagement.' },
                'pedda-siddapur-gp': { saturation: 68.0, lagDays: 15.0, target: 73.0, progressDetail: 'Needs improved follow-up on trained individuals. Data shows gaps in post-training support.' },
                'lambadiguda-gp': { saturation: 75.0, lagDays: 30.0, target: 80.0, progressDetail: 'Consistent support for micro-enterprises. Data reflects stable business growth.' },
                'chinnaraspalle-gp': { saturation: 62.0, lagDays: 40.0, target: 69.0, progressDetail: 'Requires more diversified skill training. Data shows limited course options.' },
                'borlakunta-gp': { saturation: 83.0, lagDays: 28.0, target: 88.0, progressDetail: 'Strong community engagement in livelihood programs. Data reflects high program impact.' },
                'kothmir-gp': { saturation: 69.0, lagDays: 33.0, target: 74.0, progressDetail: 'Minor delays in distributing tools/equipment. Data shows logistical challenges.' },
                'pesarikunta-gp': { saturation: 74.0, lagDays: 14.0, target: 79.0, progressDetail: 'Consistent guidance for self-employment. Data indicates timely advice.' },
                'digida-gp': { saturation: 61.0, lagDays: 45.0, target: 68.0, progressDetail: 'Needs more resources for advanced training. Data shows resource scarcity.' },
                'dahegaon-gp': { saturation: 80.0, lagDays: 20.0, target: 85.0, progressDetail: 'Good progress in connecting beneficiaries to markets. Data reflects successful linkages.' },
                'chandrapalle-gp': { saturation: 67.0, lagDays: 35.0, target: 73.0, progressDetail: 'Requires better tracking of trained individuals. Data shows gaps in follow-up.' },
                'rampur-gp': { saturation: 73.0, lagDays: 40.0, target: 78.0, progressDetail: 'Steady progress in skill development infrastructure. Data indicates consistent facility upgrades.' },
                'motleguda-gp': { saturation: 60.0, lagDays: 23.0, target: 67.0, progressDetail: 'Minor delays in releasing training funds. Data shows some financial bottlenecks.' },
                'kamarpally-gp': { saturation: 82.0, lagDays: 17.0, target: 87.0, progressDetail: 'Strong community engagement in skill acquisition. Data reflects high skill uptake.' },
                'gerre-gp': { saturation: 69.0, lagDays: 35.0, target: 74.0, progressDetail: 'Needs more diverse vocational courses. Data shows limited course options.' },
                'kalwada-gp': { saturation: 74.0, lagDays: 40.0, target: 79.0, progressDetail: 'Consistent efforts in job placement. Data indicates steady employment.' },
                'laggaon-gp': { saturation: 61.0, lagDays: 28.0, target: 68.0, progressDetail: 'Minor delays in providing post-training support. Data shows some support gaps.' },
                'ainam-gp': { saturation: 80.0, lagDays: 22.0, target: 85.0, progressDetail: 'Good progress in promoting women entrepreneurship. Data reflects growing self-sufficiency.' },
                'vodduguda-gp': { saturation: 67.0, lagDays: 45.0, target: 73.0, progressDetail: 'Requires increased awareness about available schemes. Data shows low program visibility.' },
                'hathni-gp': { saturation: 73.0, lagDays: 19.0, target: 78.0, progressDetail: 'Steady progress in skill upgrading programs. Data indicates consistent skill improvement.' },
                'kunchavelli-gp': { saturation: 60.0, lagDays: 33.0, target: 67.0, progressDetail: 'Minor delays in securing expert trainers. Data shows limited trainer availability.' },
                'chowka-gp': { saturation: 69.0, lagDays: 38.0, target: 74.0, progressDetail: 'Consistent support for trainees. Data reflects stable program operations.' },
                'beebra-gp': { saturation: 77.0, lagDays: 12.0, target: 82.0, progressDetail: 'Minor delays in distributing incentives. Data shows some payment processing issues.' }
            }
        }
    }
];

const getSchemeStatusColor = (saturation, lagDays) => {
    if (lagDays > 30) return 'text-red-600 bg-red-100';
    if (saturation < 70) return 'text-orange-600 bg-orange-100';
    if (saturation >= 90) return 'text-green-600 bg-green-100';
    return 'text-blue-600 bg-blue-100';
};

// --- Helper Components (All Inlined and Defined Before Main Component) ---

// Simple Tooltip component
const Tooltip = ({ children, content }) => {
    const [isVisible, setIsVisible] = useState(false);
    return (
        <div className="relative inline-block"
             onMouseEnter={() => setIsVisible(true)}
             onMouseLeave={() => setIsVisible(false)}>
            {children}
            {isVisible && (
                <div className="absolute z-10 px-3 py-1 text-sm text-white bg-gray-700 rounded-md whitespace-nowrap -top-8 left-1/2 -translate-x-1/2 opacity-90">
                    {content}
                </div>
            )}
        </div>
    );
};

// Simple Dialog/Modal component
const Dialog = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full relative">
                <h3 className="text-xl font-bold mb-4">{title}</h3>
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                    &times;
                </button>
                <div className="max-h-[80vh] overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

// Metric Card Component with Tooltip integration
const MetricCard = ({ metric, className = "" }) => (
    <Tooltip content={metric.description || metric.title}>
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
            </CardContent>
        </Card>
    </Tooltip>
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

// DMHO Specific Chart for Health Overview
const DMHOCharts = () => {
    // Dummy data for illustrative charts
    const antenatalCheckups = [70, 75, 80, 85, 90, 88]; // Last 6 months percentage
    const institutionalDeliveries = [60, 65, 70, 72, 75, 78]; // Last 6 months percentage
    const childImmunization = [85, 87, 89, 91, 93, 92]; // Last 6 months percentage

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <HeartPulse className="h-5 w-5 text-red-600" />
                        Antenatal Checkups (%)
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-40 flex flex-col justify-end space-y-1">
                        {/* Simple bar chart representation */}
                        {antenatalCheckups.map((value, index) => (
                            <div
                                key={index}
                                className="relative bg-red-200 rounded-sm"
                                style={{ height: `${value}%`, width: '100%', marginBottom: '2px' }}
                            >
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-red-800 font-bold">{value}%</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-muted-foreground text-center mt-2">Last 6 Months Trend</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Baby className="h-5 w-5 text-cyan-600" />
                        Institutional Deliveries (%)
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-40 flex flex-col justify-end space-y-1">
                        {/* Simple bar chart representation */}
                        {institutionalDeliveries.map((value, index) => (
                            <div
                                key={index}
                                className="relative bg-cyan-200 rounded-sm"
                                style={{ height: `${value}%`, width: '100%', marginBottom: '2px' }}
                            >
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-cyan-800 font-bold">{value}%</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-muted-foreground text-center mt-2">Last 6 Months Trend</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-purple-600" />
                        Child Immunization (%)
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-40 flex flex-col justify-end space-y-1">
                        {/* Simple bar chart representation */}
                        {childImmunization.map((value, index) => (
                            <div
                                key={index}
                                className="relative bg-purple-200 rounded-sm"
                                style={{ height: `${value}%`, width: '100%', marginBottom: '2px' }}
                            >
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-purple-800 font-bold">{value}%</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-muted-foreground text-center mt-2">Last 6 Months Trend</p>
                </CardContent>
            </Card>
        </div>
    );
};

// MCHKitDashboard (inlined)
const MCHKitDashboard = () => {
    const mchKitData = {
        summary: {
            totalKitsReceived: 12500,
            totalKitsDistributed: 11800,
            kitsInHand: 700,
            kitsInHandPercentage: 5.6
        },
        districtBreakdown: [
            { district: "KB Asifabad", kitsReceived: 4500, kitsDistributed: 4200, kitsInHand: 300, institutions: 250, distributedInstitutions: 230, availability: 92 },
            { district: "Mancherial", kitsReceived: 5000, kitsDistributed: 4800, kitsInHand: 200, institutions: 300, distributedInstitutions: 290, availability: 96.6 },
            { district: "Nirmal", kitsReceived: 3000, kitsDistributed: 2800, kitsInHand: 200, institutions: 180, distributedInstitutions: 170, availability: 94.4 },
        ],
        mandalBreakdown: [
            { mandal: "Asifabad", kitsReceived: 1500, kitsDistributed: 1450, kitsInHand: 50, institutions: 80, distributedInstitutions: 78, availability: 97.5 },
            { mandal: "Jainoor", kitsReceived: 1000, kitsDistributed: 900, kitsInHand: 100, institutions: 60, distributedInstitutions: 55, availability: 91.7 },
            { mandal: "Kagaznagar", kitsReceived: 2000, kitsDistributed: 1850, kitsInHand: 150, institutions: 110, distributedInstitutions: 100, availability: 90.9 },
        ],
        phcBreakdown: [
            { phc: "PHC Rebbena", kitsReceived: 300, kitsDistributed: 280, kitsInHand: 20, institutions: 10, distributedInstitutions: 9, availability: 90 },
            { phc: "PHC Tiryani", kitsReceived: 250, kitsDistributed: 240, kitsInHand: 10, institutions: 8, distributedInstitutions: 8, availability: 100 },
            { phc: "PHC Wankidi", kitsReceived: 400, kitsDistributed: 350, kitsInHand: 50, institutions: 12, distributedInstitutions: 10, availability: 83.3 },
        ]
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Package className="h-5 w-5 text-blue-600" />
                        MCH Kit Distribution Summary
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <Truck className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm text-blue-700">Kits Received</p>
                        <p className="text-2xl font-bold text-blue-800">{mchKitData.summary.totalKitsReceived.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                        <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
                        <p className="text-sm text-green-700">Kits Distributed</p>
                        <p className="text-2xl font-bold text-green-800">{mchKitData.summary.totalKitsDistributed.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <Package className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                        <p className="text-sm text-orange-700">Kits In Hand</p>
                        <p className="text-2xl font-bold text-orange-800">{mchKitData.summary.kitsInHand.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <XCircle className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                        <p className="text-sm text-purple-700">In Hand Percentage</p>
                        <p className="text-2xl font-bold text-purple-800">{mchKitData.summary.kitsInHandPercentage}%</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-teal-600" />
                        MCH Kit Distribution by District
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b bg-muted/50">
                                    <th className="text-left p-3 font-semibold">District</th>
                                    <th className="text-center p-3 font-semibold">Kits Received</th>
                                    <th className="text-center p-3 font-semibold">Kits Distributed</th>
                                    <th className="text-center p-3 font-semibold">Kits In Hand</th>
                                    <th className="text-center p-3 font-semibold">Total Institutions</th>
                                    <th className="text-center p-3 font-semibold">Distributed Institutions</th>
                                    <th className="text-center p-3 font-semibold">Availability (%)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mchKitData.districtBreakdown.map((row, index) => (
                                    <tr key={index} className="border-b hover:bg-muted/30">
                                        <td className="p-3 font-medium">{row.district}</td>
                                        <td className="p-3 text-center">{row.kitsReceived.toLocaleString()}</td>
                                        <td className="p-3 text-center">{row.kitsDistributed.toLocaleString()}</td>
                                        <td className="p-3 text-center">{row.kitsInHand.toLocaleString()}</td>
                                        <td className="p-3 text-center">{row.institutions.toLocaleString()}</td>
                                        <td className="p-3 text-center">{row.distributedInstitutions.toLocaleString()}</td>
                                        <td className="p-3 text-center">{row.availability}%</td>
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
                        <MapPin className="h-5 w-5 text-indigo-600" />
                        MCH Kit Distribution by Mandal (Sample)
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b bg-muted/50">
                                    <th className="text-left p-3 font-semibold">Mandal</th>
                                    <th className="text-center p-3 font-semibold">Kits Received</th>
                                    <th className="text-center p-3 font-semibold">Kits Distributed</th>
                                    <th className="text-center p-3 font-semibold">Kits In Hand</th>
                                    <th className="text-center p-3 font-semibold">Total Institutions</th>
                                    <th className="text-center p-3 font-semibold">Distributed Institutions</th>
                                    <th className="text-center p-3 font-semibold">Availability (%)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mchKitData.mandalBreakdown.map((row, index) => (
                                    <tr key={index} className="border-b hover:bg-muted/30">
                                        <td className="p-3 font-medium">{row.mandal}</td>
                                        <td className="p-3 text-center">{row.kitsReceived.toLocaleString()}</td>
                                        <td className="p-3 text-center">{row.kitsDistributed.toLocaleString()}</td>
                                        <td className="p-3 text-center">{row.kitsInHand.toLocaleString()}</td>
                                        <td className="p-3 text-center">{row.institutions.toLocaleString()}</td>
                                        <td className="p-3 text-center">{row.distributedInstitutions.toLocaleString()}</td>
                                        <td className="p-3 text-center">{row.availability}%</td>
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
                        <Home className="h-5 w-5 text-pink-600" />
                        MCH Kit Distribution by PHC (Sample)
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b bg-muted/50">
                                    <th className="text-left p-3 font-semibold">PHC</th>
                                    <th className="text-center p-3 font-semibold">Kits Received</th>
                                    <th className="text-center p-3 font-semibold">Kits Distributed</th>
                                    <th className="text-center p-3 font-semibold">Kits In Hand</th>
                                    <th className="text-center p-3 font-semibold">Total Institutions</th>
                                    <th className="text-center p-3 font-semibold">Distributed Institutions</th>
                                    <th className="text-center p-3 font-semibold">Availability (%)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mchKitData.phcBreakdown.map((row, index) => (
                                    <tr key={index} className="border-b hover:bg-muted/30">
                                        <td className="p-3 font-medium">{row.phc}</td>
                                        <td className="p-3 text-center">{row.kitsReceived.toLocaleString()}</td>
                                        <td className="p-3 text-center">{row.kitsDistributed.toLocaleString()}</td>
                                        <td className="p-3 text-center">{row.kitsInHand.toLocaleString()}</td>
                                        <td className="p-3 text-center">{row.institutions.toLocaleString()}</td>
                                        <td className="p-3 text-center">{row.distributedInstitutions.toLocaleString()}</td>
                                        <td className="p-3 text-center">{row.availability}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

// Poshan Tracker Tab Content Component (inlined)
const PoshanTrackerDashboard = ({ handlePoshanCardClick }) => {
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
    const underweightChildrenPercentage = 9.37;
    const stuntedChildrenPercentage = 12.13;
    const samChildrenPercentage = 0.54;
    const mamChildrenPercentage = 2.53;
    const awcOwnBuildingPercentage = 36.38;
    const awcConductedVHSNDPercentage = 100.00;

    // Counts from Screenshot (133) for May 2025 (District Level Totals)
    const totalAWCOpen = 782;
    const awcOpenedOutsideFencedArea = 596;
    const awcDidntOpen = 191;
    const totalChildren3YrTo6Yr = 21351;
    const totalChildrenAttended = 8007;
    const morningSnackGiven = 7856;
    const totalHCMGiven = 7003;
    const imageCaptured = 23;
    const noOfAWcCompletedECCE = 791;

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
                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handlePoshanCardClick('underweight-children', underweightChildrenPercentage, 'Percentage of underweight children under 6 years')}>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-md flex items-center gap-2">
                            Underweight Children (0-6 yrs)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-purple-700">{underweightChildrenPercentage}%</p>
                        <p className="text-xs text-muted-foreground">This percentage is from the NITI Aayog report for April 2025.</p>
                    </CardContent>
                </Card>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handlePoshanCardClick('stunted-children', stuntedChildrenPercentage, 'Percentage of stunted children under 6 years')}>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-md flex items-center gap-2">
                            Stunted Children (0-6 yrs)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-cyan-700">{stuntedChildrenPercentage}%</p>
                        <p className="text-xs text-muted-foreground">This percentage is from the NITI Aayog report for April 2025.</p>
                    </CardContent>
                </Card>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handlePoshanCardClick('sam-children', samChildrenPercentage, 'Percentage of Severe Acute Malnourishment (SAM) in Children under 6 years')}>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-md flex items-center gap-2">
                            SAM Children (0-6 yrs)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-red-700">{samChildrenPercentage}%</p>
                        <p className="text-xs text-muted-foreground">This percentage is from the NITI Aayog report for April 2025.</p>
                    </CardContent>
                </Card>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handlePoshanCardClick('mam-children', mamChildrenPercentage, 'Percentage of Moderate Acute Malnutrition (MAM) in Children under 6 years')}>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-md flex items-center gap-2">
                            MAM Children (0-6 yrs)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-orange-700">{mamChildrenPercentage}%</p>
                        <p className="text-xs text-muted-foreground">This percentage is from the NITI Aayog report for April 2025.</p>
                    </CardContent>
                </Card>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handlePoshanCardClick('awc-own-building', awcOwnBuildingPercentage, 'Proportion of Anganwadis with own Buildings')}>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-md flex items-center gap-2">
                            AWCs with Own Buildings
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-blue-700">{awcOwnBuildingPercentage}%</p>
                        <p className="text-xs text-muted-foreground">This percentage is from the NITI Aayog report for April 2025.</p>
                    </CardContent>
                </Card>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handlePoshanCardClick('awc-conducted-vhsnd', awcConductedVHSNDPercentage, 'Percentage of Anganwadi Reported to have conducted at least one VHSND')}>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-md flex items-center gap-2">
                            AWCs Conducted VHSND
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-green-700">{awcConductedVHSNDPercentage}%</p>
                        <p className="text-xs text-muted-foreground">This percentage is from the NITI Aayog report for April 2025.</p>
                    </CardContent>
                </Card>
            </div>

            {/* Daily Monitoring (May 2025 Data from Screenshot 133) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-md flex items-center gap-2">Total AWC Open (May 2025)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-amber-700">{totalAWCOpen.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Total Anganwadi Centers reported open from May 2025 data.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-md flex items-center gap-2">AWCs Opened Outside Fenced Area</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-red-700">{awcOpenedOutsideFencedArea.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">AWCs reported open but located outside a fenced area from May 2025 data.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-md flex items-center gap-2">AWCs Didn't Open</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-gray-700">{awcDidntOpen.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Anganwadi Centers reported as not open from May 2025 data.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-md flex items-center gap-2">Total Children (3-6 Yrs)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-purple-700">{totalChildren3YrTo6Yr.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Total children aged 3-6 years recorded from May 2025 data.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-md flex items-center gap-2">Total Children Attended</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-teal-700">{totalChildrenAttended.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Children who attended the Anganwadi Centers from May 2025 data.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-md flex items-center gap-2">Morning Snack Given</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-brown-700">{morningSnackGiven.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Children who received morning snack from May 2025 data.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-md flex items-center gap-2">Total HCM Given</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-lime-700">{totalHCMGiven.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Children who received Hot Cooked Meal from May 2025 data.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-md flex items-center gap-2">Image Captured</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-gray-700">{imageCaptured.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Images captured for reporting from May 2025 data.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-md flex items-center gap-2">No. of AWC Completed ECCE</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-indigo-700">{noOfAWcCompletedECCE.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Anganwadi Centers that completed Early Childhood Care and Education from May 2025 data.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

// FCRReportTab (inlined)
const FCRReportTab = ({ mandals, gramPanchayats, municipalities }) => {
    const [selectedFCRMandal, setSelectedFCRMandal] = useState(mandals[0]?.id || '');
    const [selectedFCRGP, setSelectedFCRGP] = useState(gramPanchayats[0]?.id || '');
    const [selectedFCRMunicipality, setSelectedFCRMunicipality] = useState(municipalities[0]?.id || '');

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-end gap-3 mb-4">
                <div className="flex flex-col">
                    <label htmlFor="fcr-municipality-select" className="text-xs font-medium text-muted-foreground mb-1">Municipality</label>
                    <select
                        id="fcr-municipality-select"
                        value={selectedFCRMunicipality}
                        onChange={(e) => setSelectedFCRMunicipality(e.target.value)}
                        className="block w-full min-w-[120px] p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                        {municipalities.map(item => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="fcr-mandal-select" className="text-xs font-medium text-muted-foreground mb-1">Mandal</label>
                    <select
                        id="fcr-mandal-select"
                        value={selectedFCRMandal}
                        onChange={(e) => setSelectedFCRMandal(e.target.value)}
                        className="block w-full min-w-[120px] p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                        {mandals.map(item => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="fcr-gp-select" className="text-xs font-medium text-muted-foreground mb-1">GP</label>
                    <select
                        id="fcr-gp-select"
                        value={selectedFCRGP}
                        onChange={(e) => setSelectedFCRGP(e.target.value)}
                        className="block w-full min-w-[120px] p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                        {gramPanchayats.map(item => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

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
                                    <td className="p-3" colSpan={2}>TOTAL</td>
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
        </div>
    );
};

// PHCMappingTab (inlined)
const PHCMappingTab = ({ mandals, gramPanchayats, municipalities }) => {
    const [selectedPHCMandal, setSelectedPHCMandal] = useState(mandals[0]?.id || '');
    const [selectedPHCGP, setSelectedPHCGP] = useState(gramPanchayats[0]?.id || '');
    const [selectedPHCMunicipality, setSelectedPHCMunicipality] = useState(municipalities[0]?.id || '');

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-end gap-3 mb-4">
                <div className="flex flex-col">
                    <label htmlFor="phc-municipality-select" className="text-xs font-medium text-muted-foreground mb-1">Municipality</label>
                    <select
                        id="phc-municipality-select"
                        value={selectedPHCMunicipality}
                        onChange={(e) => setSelectedPHCMunicipality(e.target.value)}
                        className="block w-full min-w-[120px] p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                        {municipalities.map(item => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="phc-mandal-select" className="text-xs font-medium text-muted-foreground mb-1">Mandal</label>
                    <select
                        id="phc-mandal-select"
                        value={selectedPHCMandal}
                        onChange={(e) => setSelectedPHCMandal(e.target.value)}
                        className="block w-full min-w-[120px] p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                        {mandals.map(item => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="phc-gp-select" className="text-xs font-medium text-muted-foreground mb-1">GP</label>
                    <select
                        id="phc-gp-select"
                        value={selectedPHCGP}
                        onChange={(e) => setSelectedPHCGP(e.target.value)}
                        className="block w-full min-w-[120px] p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                        {gramPanchayats.map(item => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        PHC Mapping Report
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b bg-muted/50">
                                    <th className="text-left p-3 font-semibold">PHC Name</th>
                                    <th className="text-center p-3 font-semibold">Mapped AWCs</th>
                                    <th className="text-left p-3 font-semibold">Latitude</th>
                                    <th className="text-left p-3 font-semibold">Longitude</th>
                                </tr>
                            </thead>
                            <tbody>
                                {phcMappingData.map((row) => (
                                    <tr key={row.id} className="border-b hover:bg-muted/30">
                                        <td className="p-3 font-medium">{row.phc}</td>
                                        <td className="p-3 text-center">{row.mappedAWCs}</td>
                                        <td className="p-3">{row.latitude}</td>
                                        <td className="p-3">{row.longitude}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

// THRReportTab (inlined)
const THRReportTab = ({ mandals, gramPanchayats, municipalities }) => {
    const [selectedTHRMandal, setSelectedTHRMandal] = useState(mandals[0]?.id || '');
    const [selectedTHRGP, setSelectedTHRGP] = useState(gramPanchayats[0]?.id || '');
    const [selectedTHRMunicipality, setSelectedTHRMunicipality] = useState(municipalities[0]?.id || '');

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-end gap-3 mb-4">
                <div className="flex flex-col">
                    <label htmlFor="thr-municipality-select" className="text-xs font-medium text-muted-foreground mb-1">Municipality</label>
                    <select
                        id="thr-municipality-select"
                        value={selectedTHRMunicipality}
                        onChange={(e) => setSelectedTHRMunicipality(e.target.value)}
                        className="block w-full min-w-[120px] p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                        {municipalities.map(item => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="thr-mandal-select" className="text-xs font-medium text-muted-foreground mb-1">Mandal</label>
                    <select
                        id="thr-mandal-select"
                        value={selectedTHRMandal}
                        onChange={(e) => setSelectedTHRMandal(e.target.value)}
                        className="block w-full min-w-[120px] p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                        {mandals.map(item => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="thr-gp-select" className="text-xs font-medium text-muted-foreground mb-1">GP</label>
                    <select
                        id="thr-gp-select"
                        value={selectedTHRGP}
                        onChange={(e) => setSelectedTHRGP(e.target.value)}
                        className="block w-full min-w-[120px] p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                        {gramPanchayats.map(item => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Heart className="h-5 w-5" />
                        THR (Take-Home Ration) Report
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b bg-muted/50">
                                    <th className="text-left p-3 font-semibold">Center</th>
                                    <th className="text-center p-3 font-semibold">Stock (Kg)</th>
                                    <th className="text-center p-3 font-semibold">Distributed (Kg)</th>
                                    <th className="text-center p-3 font-semibold">Balance (Kg)</th>
                                    <th className="text-left p-3 font-semibold">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {thrReportData.map((row) => (
                                    <tr key={row.id} className="border-b hover:bg-muted/30">
                                        <td className="p-3 font-medium">{row.center}</td>
                                        <td className="p-3 text-center">{row.stock}</td>
                                        <td className="p-3 text-center">{row.distributed}</td>
                                        <td className="p-3 text-center">{row.balance}</td>
                                        <td className="p-3">
                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                                row.status === 'Sufficient' ? 'bg-green-100 text-green-800' :
                                                row.status === 'Low' ? 'bg-orange-100 text-orange-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                                {row.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

// UtilizationReportTab (inlined)
const UtilizationReportTab = ({ mandals, gramPanchayats, municipalities }) => {
    const [selectedUtilMandal, setSelectedUtilMandal] = useState(mandals[0]?.id || '');
    const [selectedUtilGP, setSelectedUtilGP] = useState(gramPanchayats[0]?.id || '');
    const [selectedUtilMunicipality, setSelectedUtilMunicipality] = useState(municipalities[0]?.id || '');

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-end gap-3 mb-4">
                <div className="flex flex-col">
                    <label htmlFor="util-municipality-select" className="text-xs font-medium text-muted-foreground mb-1">Municipality</label>
                    <select
                        id="util-municipality-select"
                        value={selectedUtilMunicipality}
                        onChange={(e) => setSelectedUtilMunicipality(e.target.value)}
                        className="block w-full min-w-[120px] p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                        {municipalities.map(item => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="util-mandal-select" className="text-xs font-medium text-muted-foreground mb-1">Mandal</label>
                    <select
                        id="util-mandal-select"
                        value={selectedUtilMandal}
                        onChange={(e) => setSelectedUtilMandal(e.target.value)}
                        className="block w-full min-w-[120px] p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                        {mandals.map(item => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="util-gp-select" className="text-xs font-medium text-muted-foreground mb-1">GP</label>
                    <select
                        id="util-gp-select"
                        value={selectedUtilGP}
                        onChange={(e) => setSelectedUtilGP(e.target.value)}
                        className="block w-full min-w-[120px] p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                        {gramPanchayats.map(item => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Utilization Report
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b bg-muted/50">
                                    <th className="text-left p-3 font-semibold">Category</th>
                                    <th className="text-right p-3 font-semibold">Budget Allocated (₹)</th>
                                    <th className="text-right p-3 font-semibold">Amount Spent (₹)</th>
                                    <th className="text-center p-3 font-semibold">Utilization (%)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {utilizationReportData.map((row) => (
                                    <tr key={row.id} className="border-b hover:bg-muted/30">
                                        <td className="p-3 font-medium">{row.category}</td>
                                        <td className="p-3 text-right">{row.budgetAllocated.toLocaleString()}</td>
                                        <td className="p-3 text-right">{row.amountSpent.toLocaleString()}</td>
                                        <td className="p-3 text-center">
                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                                row.utilization > 90 ? 'bg-green-100 text-green-800' :
                                                row.utilization > 70 ? 'bg-orange-100 text-orange-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                                {row.utilization}%
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

// ICPSReportTab (inlined)
const ICPSReportTab = () => {
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
                        <p className="flex justify-between"><span>Orphans:</span> <span className="font-semibold">{childProtectionStats.orphans}</span></p>
                        <p className="flex justify-between"><span>Semi-orphans:</span> <span className="font-semibold">{childProtectionStats.semiOrphans}</span></p>
                        <p className="flex justify-between"><span>COVID-Orphans:</span> <span className="font-semibold">{childProtectionStats.covidOrphans}</span></p>
                        <p className="flex justify-between"><span>COVID-Semi Orphans:</span> <span className="font-semibold">{childProtectionStats.covidSemiOrphans}</span></p>
                        <p className="flex justify-between"><span>HIV Affected:</span> <span className="font-semibold">{childProtectionStats.hivAffected}</span></p>
                        <p className="flex justify-between"><span>Others:</span> <span className="font-semibold">{childProtectionStats.others}</span></p>
                        <p className="flex justify-between border-t mt-2 pt-2"><span>Total Sponsorships:</span> <span className="font-bold text-lg">{childProtectionStats.totalSponsorship}</span></p>
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
                        <p className="flex justify-between"><span>Required Budget (Upto 2024):</span> <span className="font-bold text-lg">₹{parseInt(childProtectionStats.pocsoVictimCompensationBudget).toLocaleString()}</span></p>
                        <p className="flex justify-between"><span>Total Victims (2014-2024):</span> <span className="font-semibold">{childProtectionStats.totalVictims2014_2024}</span></p>
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
                        <p className="flex justify-between"><span>Village Level:</span> <span className="font-semibold">{committees.villageChildProtectionCommittees}</span></p>
                        <p className="flex justify-between"><span>Mandal Level:</span> <span className="font-semibold">{committees.mandalLevelChildProtectionCommittee}</span></p>
                        <p className="flex justify-between"><span>District Level:</span> <span className="font-semibold">{committees.district}</span></p>
                        <p className="flex justify-between"><span>UCPC (Ward Level):</span> <span className="font-semibold">{committees.ucpcWardLevel}</span></p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

// OperationSmileMuskanTab (inlined)
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

// AWCAttendanceReportTab (inlined)
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
                                    <td className="p-3 text-center">{row.openedPercentage}%</td>
                                    <td className="p-3 text-center">{row.awtSubmittedAttendance}%</td>
                                    <td className="p-3 text-center">{row.attendanceNotSubmittedPercentage}%</td>
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
                                    <td className="p-3 text-center">{row.awtsAttendedPercentage}%</td>
                                    <td className="p-3 text-center">{row.awhsInPosition}</td>
                                    <td className="p-3 text-center">{row.awhsAttendedPercentage}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    </div>
);

// SpotFeedingReportTab (inlined)
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
                                    <td className="p-3 text-center">{row.totalPW}</td>
                                    <td className="p-3 text-center">{row.pwAttendedPercentage}%</td>
                                    <td className="p-3 text-center">{row.totalLW}</td>
                                    <td className="p-3 text-center">{row.lwAttendedPercentage}%</td>
                                    <td className="p-3 text-center">{row.totalChild}</td>
                                    <td className="p-3 text-center">{row.childAttendedPercentage}%</td>
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
                                    <td className="p-3 text-center">{row.totalPWLW}</td>
                                    <td className="p-3 text-center">{row.totalPreSchoolChildren}</td>
                                    <td className="p-3 text-center">{row.totalBeneficiaries}</td>
                                    <td className="p-3 text-center">{row.attendedLessThan21DaysPercentage}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    </div>
);

// MissionShaktiDashboard (inlined)
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
                                        <td className="p-3 text-center">{row.noOfActivitiesConducted}</td>
                                        <td className="p-3 text-center">{row.numberOfParticipants.toLocaleString()}</td>
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
                                            <td className="p-2">{row.quarter || row.financialYear}</td>
                                            <td className="p-2">{row.year || row.financialYear}</td>
                                            <td className="p-2">{row.month}</td>
                                            <td className="p-2 text-center">{row.activity || row.isConducted}</td>
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
                                    <td className="p-3">{row.week}</td>
                                    <td className="p-3">{row.activity}</td>
                                    <td className="p-3">{row.activityType}</td>
                                    <td className="p-3 text-center">{row.noOfParticipants}</td>
                                    <td className="p-3 text-center">{row.noOfRepresentativesPanchayatLocalBodies}</td>
                                    <td className="p-3 text-center">{row.noOfPublicRepresentatives}</td>
                                    <td className="p-3 text-center">{row.noOfBeneficiariesEnrolled}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="border-t-2 bg-muted/50 font-semibold">
                                <td className="p-3" colSpan={3}>Total Participants</td>
                                <td className="p-3 text-center">{weeklyActivityReportData.reduce((sum, row) => sum + row.noOfParticipants, 0).toLocaleString()}</td>
                                <td className="p-3 text-center">{weeklyActivityReportData.reduce((sum, row) => sum + row.noOfRepresentativesPanchayatLocalBodies, 0).toLocaleString()}</td>
                                <td className="p-3 text-center">{weeklyActivityReportData.reduce((sum, row) => sum + row.noOfPublicRepresentatives, 0).toLocaleString()}</td>
                                <td className="p-3 text-center">{weeklyActivityReportData.reduce((sum, row) => sum + row.noOfBeneficiariesEnrolled, 0).toLocaleString()}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </CardContent>
        </Card>
    </div>
);

const ProgressBar = ({ value, label, colorClass }) => (
    <div className="flex flex-col items-start w-full">
        <div className="flex justify-between w-full text-sm font-medium">
            <span>{label}</span>
            <span>{value}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
            <div className={`h-full rounded-full ${colorClass}`} style={{ width: `${value}%` }}></div>
        </div>
    </div>
);

// Helper for visual lag days bar (improved HTML/CSS based)
const LagBar = ({ value, label }) => (
    <div className="flex flex-col items-start w-full">
        <div className="flex justify-between w-full text-sm font-medium">
            <span>{label}</span>
            <span>{value} days</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
            <div className={`h-full rounded-full ${value > 30 ? 'bg-red-500' : value > 10 ? 'bg-orange-500' : 'bg-green-500'}`} style={{ width: `${Math.min(100, value * 1.5)}%` }}></div> {/* Adjusted scaling for visual */}
        </div>
    </div>
);


const SchemeOverviewTab = ({ selectedMandal, selectedGramPanchayat, municipalities, mandals, gramPanchayats }) => {
    const [selectedScheme, setSelectedScheme] = useState(allSchemesData[0]?.id || '');
    const [displayLevel, setDisplayLevel] = useState('overall'); // 'overall', 'district', 'mandal', 'gp'

    const currentScheme = allSchemesData.find(s => s.id === selectedScheme);

    // Helper function to get readable names from IDs
    const getGeoName = (id, level) => {
        if (level === 'district') return districts.find(d => d.id === id)?.name || id;
        if (level === 'mandal') return mandals.find(m => m.id === id)?.name || id;
        if (level === 'gp') return gramPanchayats.find(gp => gp.id === id)?.name || id;
        return id;
    };

    const getFilteredSchemeData = () => {
        if (!currentScheme || !currentScheme.geographicalData) return [];

        let data = [];
        if (displayLevel === 'overall') {
            return [{
                id: 'overall',
                name: 'Overall Performance',
                saturation: currentScheme.overall.saturation,
                lagDays: currentScheme.overall.lagDays,
                target: currentScheme.overall.target,
                progressDetail: currentScheme.overall.progressDetail
            }];
        } else if (displayLevel === 'district') {
            data = Object.entries(currentScheme.geographicalData.districts || {}).map(([key, value]) => ({
                id: key,
                name: getGeoName(key, 'district'),
                ...value
            }));
        } else if (displayLevel === 'mandal') {
            data = Object.entries(currentScheme.geographicalData.mandals || {}).map(([key, value]) => ({
                id: key,
                name: getGeoName(key, 'mandal'),
                ...value
            }));
            if (selectedMandal && mandals.some(m => m.id === selectedMandal)) {
                 data = data.filter(item => item.id === selectedMandal);
            }
        } else if (displayLevel === 'gp') {
            data = Object.entries(currentScheme.geographicalData.gps || {}).map(([key, value]) => ({
                id: key,
                name: getGeoName(key, 'gp'),
                ...value
            }));
            if (selectedGramPanchayat && gramPanchayats.some(gp => gp.id === selectedGramPanchayat)) {
                data = data.filter(item => item.id === selectedGramPanchayat);
            }
        }

        if (displayLevel !== 'overall') {
            return data.sort((a, b) => b.saturation - a.saturation);
        }
        return data;
    };

    const displayData = getFilteredSchemeData();
    const currentLevelName = displayLevel === 'district' ? 'District' :
                             displayLevel === 'mandal' ? 'Mandal' :
                             displayLevel === 'gp' ? 'Gram Panchayat' : 'Overall';

    // To prevent the "jsx" warning, ensure your style tag does not have the jsx prop
    // if you are not using styled-jsx or similar CSS-in-JS library.
    // If you need the hide-scrollbar class, define it in your global CSS.
    // For this direct code, I'll assume global CSS for hide-scrollbar or remove jsx.

    return (
        <div className="space-y-6">
            {/* Scheme Selector */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Package className="h-5 w-5 text-gray-600" />
                        Select Scheme
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <select
                        value={selectedScheme}
                        onChange={(e) => setSelectedScheme(e.target.value)}
                        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                        {allSchemesData.map(scheme => (
                            <option key={scheme.id} value={scheme.id}>
                                {scheme.name}
                            </option>
                        ))}
                    </select>
                </CardContent>
            </Card>

            {currentScheme && (
                <>
                    {/* Enhanced KPI Cards for Overall Scheme Performance */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-md flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5 text-green-600" />
                                    Overall Saturation
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-4xl font-bold text-green-700">{currentScheme.overall.saturation}%</p>
                                <p className="text-sm text-muted-foreground mt-1">Target: {currentScheme.overall.target}%</p>
                                <ProgressBar value={currentScheme.overall.saturation} label="Current" colorClass="bg-green-600" />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-md flex items-center gap-2">
                                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                                    Overall Lag Days
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-4xl font-bold text-orange-700">{currentScheme.overall.lagDays} days</p>
                                <p className="text-sm text-muted-foreground mt-1">Ideal: &lt;10 days</p>
                                <LagBar value={currentScheme.overall.lagDays} label="Current Lag" />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-md flex items-center gap-2">
                                    <Info className="h-5 w-5 text-blue-600" />
                                    Overall Progress Status
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-md font-semibold text-blue-800 leading-snug mt-2">
                                    {currentScheme.overall.progressDetail}
                                </p>
                                <p className="text-xs text-muted-foreground mt-2">Overall progress and challenges.</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Interactive Table for Split Data */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BarChart3 className="h-5 w-5" />
                                {currentScheme.name} - Performance by {currentLevelName}
                            </CardTitle>
                            <div className="flex flex-wrap gap-2 mt-2">
                                <button
                                    onClick={() => setDisplayLevel('overall')}
                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${displayLevel === 'overall' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                                >
                                    Overall
                                </button>
                                <button
                                    onClick={() => setDisplayLevel('district')}
                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${displayLevel === 'district' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                                >
                                    District Wise
                                </button>
                                <button
                                    onClick={() => setDisplayLevel('mandal')}
                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${displayLevel === 'mandal' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                                >
                                    Mandal Wise
                                </button>
                                <button
                                    onClick={() => setDisplayLevel('gp')}
                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${displayLevel === 'gp' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                                >
                                    GP Wise
                                </button>
                            </div>
                            {/* Visuals for the current table data - Top 3/Bottom 3 visual summary */}
                            {displayData.length > 1 && displayLevel !== 'overall' && (
                                <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                                    <h4 className="font-semibold text-md mb-2">Top Performing {currentLevelName}s (by Saturation)</h4>
                                    <div className="space-y-2">
                                        {displayData.slice(0, 3).map((item, index) => (
                                            <div key={item.id} className="flex items-center text-sm">
                                                <Medal className="inline-block h-4 w-4 mr-2 text-amber-500" />
                                                <span className="font-medium">{item.name}:</span>
                                                <span className="ml-auto text-green-700 font-bold">{item.saturation}% Saturation</span>
                                            </div>
                                        ))}
                                    </div>
                                    {displayData.length > 3 && (
                                        <div className="mt-4">
                                            <h4 className="font-semibold text-md mb-2">Areas for Improvement (Highest Lag)</h4>
                                            <div className="space-y-2">
                                                {displayData.slice(Math.max(0, displayData.length - 3)).sort((a,b) => b.lagDays - a.lagDays).map((item, index) => ( // Sort bottom items by lag days
                                                    <div key={item.id} className="flex items-center text-sm">
                                                        <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                                                        <span className="font-medium">{item.name}:</span>
                                                        <span className="ml-auto text-red-700 font-bold">{item.lagDays} days Lag</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </CardHeader>
                        <CardContent>
                            {displayData.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr className="border-b bg-muted/50">
                                                <th className="text-left p-3 font-semibold">Rank</th>
                                                <th className="text-left p-3 font-semibold">{currentLevelName} Name</th>
                                                <th className="text-center p-3 font-semibold">Saturation (%)</th>
                                                <th className="text-center p-3 font-semibold">Lag (Days)</th>
                                                <th className="text-center p-3 font-semibold">Target (%)</th>
                                                <th className="text-left p-3 font-semibold">Status</th>
                                                <th className="text-left p-3 font-semibold">Progress Detail</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {displayData.map((item, index) => (
                                                <tr key={item.id} className="border-b hover:bg-muted/30">
                                                    <td className="p-3 text-center font-bold">
                                                        {displayLevel !== 'overall' ? (
                                                            <>
                                                                <span className="inline-block w-4">{index + 1}</span>
                                                                {index === 0 && <Medal className="inline-block h-4 w-4 ml-1 text-yellow-500" />}
                                                            </>
                                                        ) : '-'}
                                                    </td>
                                                    <td className="p-3 font-medium">{item.name}</td>
                                                    <td className="p-3 text-center">{item.saturation}%</td>
                                                    <td className="p-3 text-center">{item.lagDays}</td>
                                                    <td className="p-3 text-center">{item.target}%</td>
                                                    <td className="p-3">
                                                        <span className={`px-2 py-1 rounded-full text-xs ${getSchemeStatusColor(item.saturation, item.lagDays)}`}>
                                                            {item.lagDays > 30 ? 'High Lag' : item.saturation < item.target ? 'Below Target' : 'On Track'}
                                                        </span>
                                                    </td>
                                                    <td className="p-3 text-sm max-w-xs overflow-hidden text-ellipsis whitespace-nowrap" title={item.progressDetail}>{item.progressDetail}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="text-muted-foreground text-center p-4">No data available for the selected scheme and geographical level. Please check the selected filters or try a different scheme.</p>
                            )}
                        </CardContent>
                    </Card>
                </>
            )}
        </div>
    );
};

// Main Dashboard Component
const DepartmentDashboardPage = () => {
    const [selectedDepartment, setSelectedDepartment] = useState('dwo');
    const [selectedMandal, setSelectedMandal] = useState(mandals[0]?.id || '');
    const [selectedGramPanchayat, setSelectedGramPanchayat] = useState(gramPanchayats[0]?.id || '');
    const [selectedMunicipality, setSelectedMunicipality] = useState(municipalities[0]?.id || '');

    // State for Poshan Tracker detail dialog
    const [isPoshanDetailDialogOpen, setIsPoshanDetailDialogOpen] = useState(false);
    const [poshanDetailData, setPoshanDetailData] = useState(null);

    const currentDepartment = departments.find(d => d.id === selectedDepartment) || departments[0];

    const handlePoshanCardClick = (kpiId, value, description) => {
        // Simulate detailed data for the dialog
        let details = {};
        switch (kpiId) {
            case 'underweight-children':
                details = {
                    title: "Underweight Children (0-6 yrs) Details",
                    data: [
                        { category: "Total Children (0-6 yrs)", count: 50000 },
                        { category: "Underweight Boys", count: 2500, percentage: ((2500 / 50000) * 100).toFixed(2) + '%' },
                        { category: "Underweight Girls", count: 2185, percentage: ((2185 / 50000) * 100).toFixed(2) + '%' },
                        { category: "Rural %", percentage: (value / 2).toFixed(2) + '%' },
                        { category: "Urban %", percentage: (value / 2).toFixed(2) + '%' },
                    ]
                };
                break;
            case 'stunted-children':
                details = {
                    title: "Stunted Children (0-6 yrs) Details",
                    data: [
                        { category: "Total Children (0-6 yrs)", count: 50000 },
                        { category: "Stunted Boys", count: 3500, percentage: ((3500 / 50000) * 100).toFixed(2) + '%' },
                        { category: "Stunted Girls", count: 2565, percentage: ((2565 / 50000) * 100).toFixed(2) + '%' },
                        { category: "Rural %", percentage: (value / 2).toFixed(2) + '%' },
                        { category: "Urban %", percentage: (value / 2).toFixed(2) + '%' },
                    ]
                };
                break;
            case 'sam-children':
                details = {
                    title: "SAM Children (0-6 yrs) Details",
                    data: [
                        { category: "Total Children (0-6 yrs)", count: 50000 },
                        { category: "SAM Boys", count: 150, percentage: ((150 / 50000) * 100).toFixed(2) + '%' },
                        { category: "SAM Girls", count: 120, percentage: ((120 / 50000) * 100).toFixed(2) + '%' },
                        { category: "Rural %", percentage: (value / 2).toFixed(2) + '%' },
                        { category: "Urban %", percentage: (value / 2).toFixed(2) + '%' },
                    ]
                };
                break;
            case 'mam-children':
                details = {
                    title: "MAM Children (0-6 yrs) Details",
                    data: [
                        { category: "Total Children (0-6 yrs)", count: 50000 },
                        { category: "MAM Boys", count: 700, percentage: ((700 / 50000) * 100).toFixed(2) + '%' },
                        { category: "MAM Girls", count: 565, percentage: ((565 / 50000) * 100).toFixed(2) + '%' },
                        { category: "Rural %", percentage: (value / 2).toFixed(2) + '%' },
                        { category: "Urban %", percentage: (value / 2).toFixed(2) + '%' },
                    ]
                };
                break;
            case 'awc-own-building':
                details = {
                    title: "AWCs with Own Buildings Details",
                    data: [
                        { category: "Total AWCs", count: 973 },
                        { category: "AWCs with Own Building", count: 354, percentage: value + '%' },
                        { category: "Rural AWCs with Own Building", count: 300, percentage: '30.8%' },
                        { category: "Urban AWCs with Own Building", count: 54, percentage: '5.5%' },
                    ]
                };
                break;
            case 'awc-conducted-vhsnd':
                details = {
                    title: "AWCs Conducted VHSND Details",
                    data: [
                        { category: "Total AWCs", count: 973 },
                        { category: "AWCs conducted VHSND", count: 973, percentage: value + '%' },
                    ]
                };
                break;
            default:
                details = { title: kpiId, data: [{ category: "Value", value: value }] };
        }
        setPoshanDetailData(details);
        setIsPoshanDetailDialogOpen(true);
    };



    return (
        <div className="space-y-8 max-w-[1600px] mx-auto p-6 animate-fade-in">
            {/* Top Header Section: Title/Breadcrumbs and Last Updated */}
            <div className="flex items-start justify-between mb-4">
                <div>
                    <div className="flex items-center gap-x-2 text-sm text-muted-foreground">
                        <span>Dashboards</span>
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-foreground">Department Dashboard</span>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight mt-2">{currentDepartment.name}</h1>
                    <p className="text-muted-foreground mt-1">{currentDepartment.description}</p>
                </div>

                <div className="flex-shrink-0 flex items-center text-sm text-muted-foreground gap-2 bg-muted px-3 py-1.5 rounded-md">
                    <CalendarIcon className="h-4 w-4" />
                    <span>Last updated: {new Date().toLocaleDateString()}</span>
                </div>
            </div>

            {/* Filters Section: Below the main title block */}
            <div className="flex flex-wrap items-end gap-3 mb-4">
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
            </div>

            {/* Department Selector - NOW ABOVE THE TABS */}
            <div className="flex items-center gap-2 mb-4">
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
            </div>

            <style>{`
            .hide-scrollbar::-webkit-scrollbar {
                display: none;
            }
            .hide-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
            }
        `}</style>

            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-7">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="poshan"> <Baby className="h-4 w-4 mr-1 inline-block"/>Poshan Tracker</TabsTrigger>
                    <TabsTrigger value="mission-shakti"><Handshake className="h-4 w-4 mr-1 inline-block"/>Mission Shakti</TabsTrigger>
                    <TabsTrigger value="nhts">NHTS Project</TabsTrigger>
                    <TabsTrigger value="reports">Data Reports</TabsTrigger>
                    <TabsTrigger value="projects">Projects</TabsTrigger>
                    <TabsTrigger value="staff">Staff</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                    {/* Department metrics */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {departmentMetrics(selectedDepartment).map((metric) => (
                            <MetricCard key={metric.id} metric={metric} className="hover:scale-105 transition-transform" />
                        ))}
                    </div>

                    {/* Conditional rendering for department-specific insights */}
                    {selectedDepartment === 'dwo' && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <NHTSProjectStatus />
                            <RecentActivitiesCard departmentId={selectedDepartment} />
                        </div>
                    )}

                    {selectedDepartment === 'health' && (
                        <>
                            <DMHOCharts /> {/* Charts for Health */}
                            <MCHKitDashboard /> {/* MCH Kit data for Health */}
                        </>
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

                    <SchemeOverviewTab
                    selectedMandal={selectedMandal}
                    selectedGramPanchayat={selectedGramPanchayat}
                    selectedMunicipality={selectedMunicipality}
                    mandals={mandals}
                    gramPanchayats={gramPanchayats}
                    municipalities={municipalities}
                    />


                </TabsContent>

                <TabsContent value="poshan" className="space-y-6">
                    {selectedDepartment === 'dwo' ? (
                        <PoshanTrackerDashboard handlePoshanCardClick={handlePoshanCardClick} />
                    ) : (
                        <Card>
                            <CardHeader><CardTitle>Poshan Tracker Data</CardTitle></CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Poshan Tracker data is typically available under the District Welfare Officer (DWO) view. Please select DWO to see the dashboard.</p>
                            </CardContent>
                        </Card>
                    )}
                    <Dialog
                        isOpen={isPoshanDetailDialogOpen}
                        onClose={() => setIsPoshanDetailDialogOpen(false)}
                        title={poshanDetailData?.title}
                    >
                        {poshanDetailData && (
                            <div className="space-y-3">
                                {poshanDetailData.data.map((item, idx) => (
                                    <p key={idx} className="flex justify-between">
                                        <span className="font-medium">{item.category}:</span>
                                        <span className="font-semibold">{item.count?.toLocaleString() || item.percentage}</span>
                                    </p>
                                ))}
                            </div>
                        )}
                        <p className="text-sm text-muted-foreground mt-4">
                            *Note: Gender-wise and area-wise splits are simulated for demonstration.
                        </p>
                    </Dialog>
                </TabsContent>

                <TabsContent value="mission-shakti" className="space-y-6">
                    {selectedDepartment === 'dwo' ? (
                        <MissionShaktiDashboard />
                    ) : (
                        <Card>
                            <CardHeader><CardTitle>Mission Shakti Data</CardTitle></CardHeader>
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
                                <CardHeader><CardTitle className="text-lg">Survey Teams</CardTitle></CardHeader>
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
                                <CardHeader><CardTitle className="text-lg">Data Quality</CardTitle></CardHeader>
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
                    <Tabs defaultValue="fcr" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-4 mb-2"> {/* Adjusted to fit in 2 rows on small screens */}
                            <TabsTrigger value="fcr"><Package className="h-4 w-4 mr-1 inline-block"/> FCR Report</TabsTrigger>
                            <TabsTrigger value="phc"><MapPin className="h-4 w-4 mr-1 inline-block"/> PHC Mapping</TabsTrigger>
                            <TabsTrigger value="thr"><Heart className="h-4 w-4 mr-1 inline-block"/> THR Report</TabsTrigger>
                            <TabsTrigger value="utilization"><BarChart3 className="h-4 w-4 mr-1 inline-block"/> Utilization Report</TabsTrigger>
                        </TabsList>
                        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-4"> {/* Second row of report tabs */}
                            <TabsTrigger value="icps"><Baby className="h-4 w-4 mr-1 inline-block"/> ICPS Report</TabsTrigger>
                            <TabsTrigger value="ops-smile-muskan"><Sun className="h-4 w-4 mr-1 inline-block"/> Ops Smile/Muskan</TabsTrigger>
                            <TabsTrigger value="awc-attendance"><Home className="h-4 w-4 mr-1 inline-block"/> AWC Attendance</TabsTrigger>
                            <TabsTrigger value="spot-feeding"><Utensils className="h-4 w-4 mr-1 inline-block"/> Spot Feeding</TabsTrigger>
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
                        <CardHeader><CardTitle>Department Projects</CardTitle></CardHeader>
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
                                            <div><span className="text-muted-foreground">Progress:</span> <span className="ml-1 font-medium">92%</span></div>
                                            <div><span className="text-muted-foreground">Timeline:</span> <span className="ml-1 font-medium">On Track</span></div>
                                            <div><span className="text-muted-foreground">Budget:</span> <span className="ml-1 font-medium">₹2.4 Cr</span></div>
                                        </div>
                                    </div>

                                    <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-semibold text-lg">Anganwadi Modernization</h3>
                                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">Ongoing</span>
                                        </div>
                                        <p className="text-muted-foreground mb-3">Infrastructure development and technology upgrades for AWCs</p>
                                        <div className="grid grid-cols-3 gap-4 text-sm">
                                            <div><span className="text-muted-foreground">Progress:</span> <span className="ml-1 font-medium">78%</span></div>
                                            <div><span className="text-muted-foreground">Timeline:</span> <span className="ml-1 font-medium">On Track</span></div>
                                            <div><span className="text-muted-foreground">Budget:</span> <span className="ml-1 font-medium">₹5.8 Cr</span></div>
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
                        <CardHeader><CardTitle>Staff Directory</CardTitle></CardHeader>
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
                                    <br/>
                                    <button className="text-blue-500 hover:underline mt-2">View Staff Reporting Logs</button>
                                    <br/>
                                    <button className="text-blue-500 hover:underline mt-1">View Report History</button>
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