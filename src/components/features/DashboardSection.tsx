
import React from 'react';

const DashboardSection = () => {
  return (
    <div>
      <h3 className="text-2xl font-semibold text-center mb-12 features-animate fade-in">
        Holistic Dashboards
      </h3>
      <div className="grid md:grid-cols-2 gap-8 features-animate fade-in">
        <div className="bg-gov-blue text-white rounded-xl overflow-hidden shadow-xl">
          <div className="p-8">
            <h4 className="text-xl font-semibold mb-6">Comprehensive Insights Across Multiple Dimensions</h4>
            <ul className="space-y-4">
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-white mr-3"></span>
                <span>District Overview</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-white mr-3"></span>
                <span>Department Performance</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-white mr-3"></span>
                <span>Project Tracking</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-white mr-3"></span>
                <span>State/Central Indicator Monitoring</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-white mr-3"></span>
                <span>Budget Visualization</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-white mr-3"></span>
                <span>Monitoring & Evaluation Views</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="rounded-xl overflow-hidden shadow-xl bg-white">
          <div className="bg-gov-lightblue p-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
          </div>
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-semibold">Budget Allocation and Utilization</h4>
              <select className="text-sm bg-gray-100 rounded p-1">
                <option>This Year</option>
                <option>Last Year</option>
              </select>
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Healthcare</span>
                  <span>₹2.4 Cr / ₹3.2 Cr</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-gov-blue h-2.5 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Education</span>
                  <span>₹4.1 Cr / ₹5.5 Cr</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-gov-blue h-2.5 rounded-full" style={{ width: '74%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Infrastructure</span>
                  <span>₹8.7 Cr / ₹12 Cr</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-gov-blue h-2.5 rounded-full" style={{ width: '72%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Agriculture</span>
                  <span>₹3.6 Cr / ₹6 Cr</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-gov-blue h-2.5 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Social Welfare</span>
                  <span>₹1.9 Cr / ₹2 Cr</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-gov-blue h-2.5 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSection;
