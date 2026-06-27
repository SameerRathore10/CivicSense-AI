import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

const fileToBase64 = (file) => {
return new Promise((resolve, reject) => {
const reader = new FileReader();


reader.readAsDataURL(file);

reader.onload = () => {
  const base64 = reader.result.split(",")[1];
  resolve(base64);
};

reader.onerror = (error) => reject(error);


});
};

export const analyzeIssue = async (file) => {
try {
const base64Image = await fileToBase64(file);


const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",

  contents: [
    {
      inlineData: {
        mimeType: file.type,
        data: base64Image,
      },
    },
   {
  text: `
You are an expert Civic Issue Detection AI.

Analyze this image carefully.

Identify the MOST LIKELY civic issue.

Possible issue types:

* Pothole
* Road Damage
* Footpath Damage
* Open Manhole
* Garbage Overflow
* Illegal Dumping
* Construction Waste
* Water Leakage
* Drainage Problem
* Sewage Overflow
* Water Pollution
* Flooding
* Air Pollution
* Industrial Pollution
* Smoke Emission
* Toxic Gas Leakage
* Vehicle Pollution
* Dust Pollution
* Construction Dust
* Waste Burning
* Crop Burning
* Landfill Emissions
* Noise Pollution
* Streetlight Failure
* Broken Streetlight
* Traffic Signal Damage
* Fallen Tree
* Road Obstruction
* Encroachment
* Public Property Damage
* Park Damage
* Wall Damage
* Electrical Hazard
* Fire Hazard
* Unsafe Infrastructure
* Damaged Signboard
* Environmental Hazard
* Other

Severity:

* Low
* Medium
* High

Priority:

* Normal
* Important
* Urgent

Department:

* Roads Department
* Sanitation Department
* Water Department
* Electricity Department
* Parks Department
* Traffic Department
* Public Works Department
* Environmental Department
* Pollution Control Board
* Disaster Management Department

Rules:

* Base the answer ONLY on what is visible.
* Do not guess.
* Choose the closest matching issue.
* Give confidence between 50 and 100.

Road & Infrastructure:

* Road cracks, broken asphalt, damaged roads → Road Damage
* Circular holes in roads → Pothole
* Broken sidewalks or walkways → Footpath Damage
* Missing manhole covers → Open Manhole
* Damaged public structures → Public Property Damage
* Unsafe buildings or structures → Unsafe Infrastructure

Waste & Sanitation:

* Overflowing garbage bins → Garbage Overflow
* Waste dumped in public places → Illegal Dumping
* Building debris and rubble → Construction Waste
* Blocked drains → Drainage Problem
* Sewage on roads or public areas → Sewage Overflow

Water Issues:

* Pipe leakage or water wastage → Water Leakage
* Polluted rivers, lakes, ponds, drainage discharge → Water Pollution
* Waterlogged roads or areas → Flooding

Air & Environmental Issues:

* Factory smoke or industrial emissions → Industrial Pollution
* Heavy smoke in the atmosphere → Air Pollution
* Toxic chemical releases → Toxic Gas Leakage
* Dense traffic smoke → Vehicle Pollution
* Dust clouds from roads → Dust Pollution
* Dust from construction sites → Construction Dust
* Burning garbage → Waste Burning
* Crop residue burning → Crop Burning
* Landfill gas or dump emissions → Landfill Emissions
* General environmental danger → Environmental Hazard

Utilities:

* Non-working streetlights → Streetlight Failure
* Physically damaged streetlights → Broken Streetlight
* Damaged traffic signals → Traffic Signal Damage
* Exposed wires, transformers, electric poles → Electrical Hazard

Safety Hazards:

* Visible fire, flames, burning structures → Fire Hazard
* Trees blocking roads or infrastructure → Fallen Tree
* Objects blocking traffic movement → Road Obstruction
* Illegal occupation of public space → Encroachment
* Excessive public noise → Noise Pollution

If no category matches clearly:

* issueType must be "Other"

Return ONLY valid JSON:

{
"issueType": "",
"severity": "",
"priority": "",
"confidence": "",
"department": "",
"description": ""
}
`,
},
],
});


return response.text;


} catch (error) {
console.error("Gemini Error:", error);
return null;
}
};
