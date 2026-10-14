/**
 * @file Semantic visual reading maps, grounded in each case study's verified responsibilities.
 * @author meetbyte
 */
const maps: Record<string, {title:string; note:string; stages:[string,string][]; across:string[]}> = {
 "apex-self-service": {title:"From business question to governed output",note:"A conceptual reading map of the application responsibilities.",stages:[["Define the request","Card, spending and market criteria, plus the required output columns."],["Express it in APEX","Query-generation pages connect the criteria to the data request."],["Carry repeated work","Weekly/monthly schedules support recurring file generation."],["Make results available","Exported files, webpage access and email-triggered communications."]],across:["Microsoft LDAP","User / Supervisor / Admin","PII masking","Audit"]},
 "mobilefirst-modernization": {title:"What changes — and what must carry through",note:"Platform transition, integration responsibilities and delivery context.",stages:[["Existing platform","IBM MobileFirst 8.x, SQL/HTTP/Java adapters and platform APIs."],["Replacement stack","Java and Spring Boot, with integration and API adaptation."],["Application context","Loan, EMI and payment journeys; Cordova and APIGEE connections."],["Delivery context","Frontend/backend Jenkins pipelines with QA and support coordination."]],across:["Preserved functionality","Coding standards","Ongoing delivery"]},
 "engineering-tooling": {title:"Assistance, feedback and delivery",note:"Complementary capabilities; each produces a different kind of evidence.",stages:[["Authoring assistance","Bounded GitHub Copilot agent for documentation, comments and code."],["Mechanical feedback","OWASP dependency checking and GitHub code scanning."],["Quality feedback","SonarQube in the delivery workflow."],["Repeatable delivery","Jenkins pipelines for frontend and backend applications."]],across:["Defined conditions","Team standards","Human judgment"]},
 "production-investigation": {title:"Connecting the report to a verified correction",note:"A reading map of hands-on investigation and collaboration through resolution.",stages:[["Reported interruption","Business and customer-support perspective on the affected task."],["Investigation","Connect expected behavior, observed behavior and system flow."],["Correction","Hands-on implementation, with QA and support collaboration."],["Follow-through","Coordinate the change and communicate what is known through resolution."]],across:["Business context","Root-cause analysis","QA","Production support"]}
};
/** Presents a responsive text alternative rather than an invented production architecture. @author meetbyte */
export function ExperienceMap({id}:{id:string}) {
 const map=maps[id];if(!map)return null;
 return <section className="experience-map" aria-labelledby={`map-${id}`}>
  <p className="eyebrow">THE WORK, AT A GLANCE</p><h2 id={`map-${id}`}>{map.title}</h2><p className="map-note">{map.note}</p>
  <ol className="map-stages">{map.stages.map(([title,detail],index)=><li key={title}><span className="map-number" aria-hidden="true">{String(index+1).padStart(2,"0")}</span><div><h3>{title}</h3><p>{detail}</p></div></li>)}</ol>
  <div className="map-across"><span>Across the work</span><ul>{map.across.map(item=><li key={item}>{item}</li>)}</ul></div>
 </section>;
}
