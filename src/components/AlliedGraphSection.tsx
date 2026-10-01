import React, { useState } from 'react';
import { Network, Shield, Award, CheckCircle, Wrench, FileText, ArrowRight, Layers } from 'lucide-react';

interface RelatedBranch {
  id: string;
  category: string;
  code: string;
  title: string;
  relationship: string;
  rationale: string;
}

interface ProductGraph {
  productId: string;
  productCode: string;
  productTitle: string;
  productSubtitle: string;
  branches: RelatedBranch[];
}

const PRODUCT_GRAPHS: ProductGraph[] = [
  {
    productId: 'led',
    productCode: 'IS 10322 (Part 5/Sec 3): 2012',
    productTitle: 'Luminaires for Road and Street Lighting',
    productSubtitle: 'Host Product Specification (Electrical Luminaires)',
    branches: [
      {
        id: 'safety',
        category: 'Safety Standard',
        code: 'IS 15885 (Part 2/Sec 13): 2012',
        title: 'Electronic Controlgear for LED Modules',
        relationship: 'MANDATORY COMPONENT SAFETY',
        rationale: 'LED drivers operating on 230V mains must independently hold BIS CRS registration to prevent electrical fires and withstand outdoor voltage surges.'
      },
      {
        id: 'testing',
        category: 'Testing Protocol',
        code: 'IS/IEC 60529: 2001',
        title: 'Degrees of Protection by Enclosures (IP Code)',
        relationship: 'INGRESS CODE VERIFICATION',
        rationale: 'Prescribes the vacuum dust chamber (IP6X) and 100 kPa pressurized water jet (IPX6) test conditions required to validate IP66 outdoor claims.'
      },
      {
        id: 'performance',
        category: 'Performance Standard',
        code: 'IS 16107 (Part 2/Sec 1): 2012',
        title: 'Single Capped LED Lamps — LED Luminaires',
        relationship: 'EFFICACY & LUMEN MAINTENANCE',
        rationale: 'Validates 110 lm/W luminous efficiency and 6,000-hour accelerated aging to legally support 5-year replacement warranties.'
      },
      {
        id: 'photobio',
        category: 'Safety Standard',
        code: 'IS 16108: 2012 / IEC 62471',
        title: 'Photobiological Safety of Lamps and Lamp Systems',
        relationship: 'OPTICAL RADIATION HAZARD',
        rationale: 'Guarantees blue light optical emissions remain within Exempt (RG0) or Low Risk (RG1) limits to prevent human retinal damage.'
      },
      {
        id: 'installation',
        category: 'Installation Code',
        code: 'IS 1944 (Parts 1 & 2)',
        title: 'Code of Practice for Lighting of Public Thoroughfares',
        relationship: 'CIVIL & ERECTION CODE',
        rationale: 'Specifies mounting height, overhang, and luminaire spacing requirements for municipal thoroughfare electrical installation.'
      },
      {
        id: 'certification',
        category: 'Statutory Order',
        code: 'DPIIT QCO Order S.O. 2357(E)',
        title: 'Electronics & IT Goods Mandatory Registration',
        relationship: 'QUALITY CONTROL ORDER',
        rationale: 'Mandates compulsory registration under Bureau of Indian Standards before commercial customs clearance or public tender delivery.'
      }
    ]
  },
  {
    productId: 'solar',
    productCode: 'IS 14286: 2010 / IEC 61215',
    productTitle: 'Crystalline Silicon Terrestrial Photovoltaic Modules',
    productSubtitle: 'Host Product Specification (Solar Energy)',
    branches: [
      {
        id: 'safety',
        category: 'Safety Standard',
        code: 'IS/IEC 61730 (Parts 1 & 2): 2004',
        title: 'Photovoltaic (PV) Module Safety Qualification',
        relationship: 'ELECTRICAL HAZARD QUALIFICATION',
        rationale: 'Mandatory construction and test requirements for solar modules to provide safe electrical and mechanical operation under open circuit 1000V DC.'
      },
      {
        id: 'corrosion',
        category: 'Testing Protocol',
        code: 'IS/IEC 61701: 2011',
        title: 'Salt Mist Corrosion Testing of Photovoltaic Modules',
        relationship: 'COASTAL ENVIRONMENT TEST',
        rationale: 'Essential for tenders in coastal or humid regions to verify anti-corrosion barrier resistance against maritime atmospheric degradation.'
      },
      {
        id: 'qco',
        category: 'Statutory Order',
        code: 'MNRE Solar Photovoltaics Order 2017',
        title: 'Compulsory Registration under Bureau of Indian Standards',
        relationship: 'MINISTRY MANDATE',
        rationale: 'Grid-connected solar tenders require active BIS CRS inclusion on the Approved List of Models and Manufacturers (ALMM).'
      }
    ]
  },
  {
    productId: 'mask',
    productCode: 'IS 16288: 2014',
    productTitle: 'Surgical Face Masks — Specification',
    productSubtitle: 'Host Product Specification (Medical Devices)',
    branches: [
      {
        id: 'filtration',
        category: 'Testing Protocol',
        code: 'IS 16289: 2014',
        title: 'Medical Face Masks — Bacterial Filtration Efficiency (BFE)',
        relationship: 'PATHOGEN TESTING PROTOCOL',
        rationale: 'Prescribes aerosol challenge testing with Staphylococcus aureus to certify greater than 98% bacterial filtration efficiency.'
      },
      {
        id: 'biocompatibility',
        category: 'Safety Standard',
        code: 'IS/ISO 10993-1: 2018',
        title: 'Biological Evaluation of Medical Devices',
        relationship: 'SKIN SENSITIZATION PROTOCOL',
        rationale: 'Ensures the non-woven polypropylene material causes no cytotoxicity, irritation, or skin sensitization for healthcare personnel.'
      },
      {
        id: 'differential',
        category: 'Testing Protocol',
        code: 'IS 16288 Clause 6.3',
        title: 'Differential Pressure (Breathability Test)',
        relationship: 'AIRFLOW RESISTANCE STANDARD',
        rationale: 'Verifies differential pressure remains under 49.0 Pa/cm² to ensure breathing ease during prolonged surgical procedures.'
      }
    ]
  }
];

export const AlliedGraphSection: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductGraph>(PRODUCT_GRAPHS[0]);
  const [selectedBranch, setSelectedBranch] = useState<RelatedBranch>(PRODUCT_GRAPHS[0].branches[0]);

  const handleSelectProduct = (product: ProductGraph) => {
    setSelectedProduct(product);
    setSelectedBranch(product.branches[0]);
  };

  return (
    <section id="standards" className="relative bg-[#FFFFFF] py-16 sm:py-20 lg:py-28 border-b border-[#D8D4CD]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="flex items-center gap-2 mb-2 font-mono text-xs font-bold uppercase tracking-widest text-[#7F171D]">
            <span className="h-2 w-2 bg-[#7F171D]" />
            <span>KNOWLEDGE GRAPH EXPLORER</span>
          </div>
          <h2 className="font-sans text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#171717] tracking-tight">
            Related Standards Architecture
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#666666] leading-relaxed">
            Indian Standards exist within an interdependent regulatory web. When procuring equipment, allied safety, testing, and installation standards are legally binding under tender conditions.
          </p>
        </div>

        {/* Product Selector Bar */}
        <div className="mb-8">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#666666] mb-2 font-bold">
            SELECT HOST PRODUCT CLUSTER TO EXPAND GRAPH:
          </div>
          <div className="flex flex-wrap gap-2">
            {PRODUCT_GRAPHS.map((prod) => {
              const isSelected = selectedProduct.productId === prod.productId;
              return (
                <button
                  key={prod.productId}
                  onClick={() => handleSelectProduct(prod)}
                  className={`px-4 py-2 text-xs font-bold rounded-sm transition-all ${
                    isSelected
                      ? 'bg-[#7F171D] text-white shadow-xs'
                      : 'border border-[#D8D4CD] bg-[#F4F1EB] text-[#171717] hover:border-[#7F171D]'
                  }`}
                >
                  {prod.productTitle}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tree Layout: Primary Standard -> Branches */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left: Interactive Tree Map */}
          <div className="lg:col-span-7 border border-[#D8D4CD] bg-[#F4F1EB] p-4 sm:p-6 lg:p-8 rounded-2xl">
            
            {/* Primary Root Node */}
            <div className="border-2 border-[#7F171D] bg-[#FFFFFF] p-4 sm:p-5 rounded-lg shadow-sm">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="bg-[#7F171D] text-white px-2.5 py-0.5 rounded-xs font-bold uppercase text-[10px]">
                  PRIMARY SPECIFIED STANDARD
                </span>
                <span className="text-[#666666] text-[11px]">ROOT NODE</span>
              </div>
              <h3 className="mt-2 font-mono text-base sm:text-lg font-extrabold text-[#171717]">
                {selectedProduct.productCode}
              </h3>
              <p className="text-xs text-[#666666] mt-0.5">
                {selectedProduct.productSubtitle}
              </p>
            </div>

            {/* Tree Branch Connectors */}
            <div className="mt-6 space-y-2.5">
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#666666] mb-3 flex items-center justify-between">
                <span>INTERDEPENDENT ALLIED STANDARDS ({selectedProduct.branches.length})</span>
                <span className="text-[11px] text-[#7F171D]">Tap to inspect details</span>
              </div>

              {selectedProduct.branches.map((branch) => {
                const isSelected = selectedBranch.id === branch.id;
                return (
                  <div
                    key={branch.id}
                    onClick={() => setSelectedBranch(branch)}
                    className={`cursor-pointer border p-3.5 sm:p-4 rounded-lg transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 ${
                      isSelected
                        ? 'border-[#7F171D] bg-[#FFFFFF] shadow-sm ring-1 ring-[#7F171D]'
                        : 'border-[#D8D4CD] bg-[#FFFFFF]/70 hover:bg-[#FFFFFF]'
                    }`}
                  >
                    <div className="flex items-start sm:items-center gap-3">
                      <span className={`h-2.5 w-2.5 rounded-full mt-1 sm:mt-0 shrink-0 ${isSelected ? 'bg-[#7F171D]' : 'bg-[#D8D4CD]'}`} />
                      <div>
                        <div className="font-mono text-xs font-bold text-[#171717]">
                          {branch.code}
                        </div>
                        <div className="text-[11px] text-[#666666]">
                          {branch.title}
                        </div>
                      </div>
                    </div>

                    <div className="self-end sm:self-auto font-mono text-[10px] font-bold text-[#7F171D] uppercase">
                      {branch.category}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right: Branch Inspector Panel */}
          <div className="lg:col-span-5 border border-[#D8D4CD] bg-[#FFFFFF] p-5 sm:p-8 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#D8D4CD] font-mono text-xs">
              <span className="text-[#666666] uppercase text-[11px]">RELATIONSHIP INSPECTOR</span>
              <span className="text-[#7F171D] font-bold uppercase text-[11px]">{selectedBranch.category}</span>
            </div>

            <div className="mt-4">
              <h4 className="font-mono text-base sm:text-lg font-bold text-[#171717]">
                {selectedBranch.code}
              </h4>
              <p className="mt-1 text-xs text-[#666666]">
                {selectedBranch.title}
              </p>
            </div>

            <div className="mt-5 border-l-3 border-[#7F171D] bg-[#F4F1EB] p-3.5 rounded-r-md">
              <div className="text-[10px] font-mono font-bold uppercase text-[#7F171D]">
                RELATIONSHIP TO TENDER SPECIFICATION
              </div>
              <div className="mt-1 font-mono text-xs font-bold text-[#171717]">
                {selectedBranch.relationship}
              </div>
            </div>

            <div className="mt-5">
              <div className="text-[10px] font-mono font-bold uppercase text-[#666666] mb-1">
                CONTRACTUAL COMPLIANCE RATIONALE
              </div>
              <p className="text-xs sm:text-sm text-[#171717] leading-relaxed">
                {selectedBranch.rationale}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-[#D8D4CD] flex items-center justify-between text-xs font-mono text-[#666666]">
              <span>Bureau of Indian Standards Indexed</span>
              <span className="text-[#7F171D] font-bold">Clause Traceable ✓</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
