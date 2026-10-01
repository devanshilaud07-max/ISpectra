import { VERIFIED_BIS_STANDARDS } from '../data/standardsDatabase';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  standardsCited?: string[];
}

export function generateLocalCopilotResponse(userQuery: string): string {
  const query = userQuery.toLowerCase();

  // 1. LED Street Light / Roadway
  if (query.includes('led') || query.includes('street light') || query.includes('luminaire') || query.includes('10322') || query.includes('driver') || query.includes('15885')) {
    return `For outdoor LED street lighting procurement, the primary Indian Standard is **IS 10322 (Part 5/Sec 3): 2012** (*Luminaires — Road and Street Lighting*).

Key interdependent standards you must cite in your tender schedule:
1. **Host Product**: **IS 10322 (Part 5/Sec 3): 2012** (Mandatory electrical & optical construction).
2. **LED Driver Safety**: **IS 15885 (Part 2/Sec 13): 2012** (Compulsory Registration Scheme / CRS registration to prevent electrical fires).
3. **Ingress Protection**: **IS/IEC 60529: 2001** (Specifies vacuum dust chamber and high-pressure jet tests for IP66).
4. **Performance & Efficacy**: **IS 16107 (Part 2/Sec 1): 2012** (Validates ≥ 110 lm/W and lumen maintenance).
5. **Photobiological Safety**: **IS 16108: 2012 / IEC 62471** (Restricts retinal blue-light hazard to RG0/RG1).

**Important Advisory**: Never cite the old code **IS 1944**, as it was withdrawn by the Bureau of Indian Standards in 2017.`;
  }

  // 2. Solar PV / Inverters
  if (query.includes('solar') || query.includes('pv') || query.includes('module') || query.includes('14286') || query.includes('mnre')) {
    return `For Solar Photovoltaic (PV) procurement tenders, the Bureau of Indian Standards mandates:

1. **Design & Type Approval**: **IS 14286: 2010 / IEC 61215** (*Crystalline Silicon Terrestrial PV Modules*).
2. **Electrical Safety**: **IS/IEC 61730 (Parts 1 & 2): 2004** (Guarantees Class A safety for 1000V DC open circuit).
3. **Corrosion Testing**: **IS/IEC 61701: 2011** (Salt mist corrosion testing for coastal / humid installations).
4. **Statutory Order**: Covered under the **MNRE Solar Photovoltaics Quality Control Order 2017** requiring compulsory BIS registration and inclusion in the Approved List of Models and Manufacturers (ALMM).`;
  }

  // 3. Surgical Masks / PPE / Medical
  if (query.includes('mask') || query.includes('surgical') || query.includes('medical') || query.includes('16288') || query.includes('ppe')) {
    return `For medical surgical face mask tenders:

1. **Primary Product**: **IS 16288: 2014** (*Surgical Face Masks — Specification*).
2. **Filtration Efficiency**: **IS 16289: 2014** (Bacterial Filtration Efficiency / BFE ≥ 98% with *Staphylococcus aureus* aerosol challenge).
3. **Biocompatibility**: **IS/ISO 10993-1: 2018** (Cytotoxicity and skin irritation protocols).
4. **Breathability**: Must meet differential pressure < 49.0 Pa/cm² under Clause 6.3.`;
  }

  // 4. Fire Doors / Civil
  if (query.includes('fire door') || query.includes('doorset') || query.includes('3614') || query.includes('fire check')) {
    return `For fire check doorsets in public buildings and infrastructure:

1. **Current Standard**: **IS 3614: 2021** (*Fire Resisting Doorsets — Specification*).
2. **Supersession Alert**: The older codes **IS 3614 (Part 1): 1966** and **IS 3614 (Part 2): 1992** are completely superseded.
3. **Testing Protocol**: Must undergo fire resistance testing under **IS/ISO 3008-1: 2019** for integrity and insulation ratings (e.g., 60, 90, or 120 minutes).
4. **QCO Order**: Under the DPIIT Quality Control Order on Fire Resisting Doorsets, ISI mark certification is compulsory.`;
  }

  // 5. Withdrawn / Superseded query
  if (query.includes('withdrawn') || query.includes('superseded') || query.includes('1944') || query.includes('valid') || query.includes('gazette')) {
    return `In Indian public procurement, citing a **WITHDRAWN** standard renders tender specifications legally vulnerable and causes contractor disputes.

- **Example**: **IS 1944 (Parts 1 & 2): 1970** (*Public Thoroughfares Lighting*) was formally withdrawn in 2017.
- **Enforced Replacement**: **IS 10322 (Part 5/Sec 3): 2012** with active Amendments 1, 2, and 3.
- Under **GeM (Government e-Marketplace)** procurement guidelines, bids must cite the latest gazette revision with active amendments.`;
  }

  // 6. Generic Standards Guidance
  return `Welcome to **ISpectra Copilot**, your Bureau of Indian Standards (BIS) and tender procurement assistant.

I can help you:
- Identify applicable **IS numbers** and testing standards for your procurement items (e.g. electrical luminaires, solar PV, medical gear, structural steel, PVC pipes).
- Verify whether a cited standard is **CURRENT**, **AMENDED**, or **WITHDRAWN**.
- Check **Quality Control Orders (QCO)** issued by MeitY, DPIIT, and Ministry of Power.
- Extract clauses and required test certificates (IP66, BFE, Surge 10kV, Fire Rating).

Try asking: *"Which standards apply to outdoor street lighting?"* or *"Is IS 1944 still valid under BIS?"*`;
}
