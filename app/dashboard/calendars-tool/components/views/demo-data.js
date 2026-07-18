export const COURSES = [
  { id: "nur201", name: "NUR 201", label: "Fundamentals of Nursing", color: "#3B82F6", grade: "A-", done: "1/4" },
  { id: "nur310", name: "NUR 310", label: "Pharmacology", color: "#8B5CF6", grade: "B+", done: "1/3" },
  { id: "nur315", name: "NUR 315", label: "Med-Surg Nursing", color: "#10B981", grade: null, done: "0/3" },
  { id: "bio220", name: "BIO 220", label: "Pathophysiology", color: "#F59E0B", grade: "A", done: "1/4" },
  { id: "nur320", name: "NUR 320", label: "Maternal Nursing", color: "#EF4444", grade: null, done: "0/3" },
];

const y = 2026;
const m = 6; // July (0-indexed)

const ev = (title, course, start, end, type, pts, instructor) => ({
  title, course, start: new Date(y, m, start, ...( Array.isArray(end) ? [] : [])),
  start: new Date(y, m, start, 9, 0),
  end: new Date(y, m, typeof end === "number" ? start : start, typeof end === "number" ? end : 10, 0),
  type, pts, instructor,
  id: Math.random().toString(36).slice(2),
});

export const EVENTS = [
  { id:"e1",  title:"Patient Assessment Lab",    course:"NUR 201", start: new Date(y,m,10,8,0),  end: new Date(y,m,10,10,0), type:"lab",        pts:50, instructor:"Dr. Sandra Mills",  email:"s.mills@nursing.edu", room:"SCI 204 · MWF 9:00-10:15 AM" },
  { id:"e2",  title:"Cardiovascular Reading",     course:"BIO 220", start: new Date(y,m,10,10,0), end: new Date(y,m,10,11,0), type:"reading",    pts:10, instructor:"Dr. James Reed",    email:"j.reed@bio.edu",     room:"BIO 301 · TR 11:00-12:15 PM" },
  { id:"e3",  title:"Drug Classification Quiz",   course:"NUR 310", start: new Date(y,m,11,9,0),  end: new Date(y,m,11,10,0), type:"quiz",       pts:25, instructor:"Dr. Kim Patel",    email:"k.patel@pharm.edu",  room:"NUR 102 · MWF 10:00-11:15 AM" },
  { id:"e4",  title:"Prenatal Assessment Quiz",   course:"NUR 320", start: new Date(y,m,12,9,0),  end: new Date(y,m,12,10,0), type:"quiz",       pts:25, instructor:"Dr. Lena Foster",   email:"l.foster@nur.edu",   room:"NUR 205 · TR 1:00-2:15 PM" },
  { id:"e5",  title:"Clinical Skills Check-off",  course:"NUR 315", start: new Date(y,m,13,8,0),  end: new Date(y,m,13,11,0), type:"lab",        pts:75, instructor:"Dr. Mark Chen",    email:"m.chen@medsurg.edu", room:"SIM 101 · MW 8:00-11:00 AM" },
  { id:"e6",  title:"Nursing Process Quiz",       course:"NUR 201", start: new Date(y,m,14,9,0),  end: new Date(y,m,14,10,0), type:"quiz",       pts:20, instructor:"Dr. Sandra Mills",  email:"s.mills@nursing.edu", room:"SCI 204 · MWF 9:00-10:15 AM" },
  { id:"e7",  title:"Disease Mechanism Quiz",     course:"BIO 220", start: new Date(y,m,15,10,0), end: new Date(y,m,15,11,0), type:"quiz",       pts:30, instructor:"Dr. James Reed",    email:"j.reed@bio.edu",     room:"BIO 301 · TR 11:00-12:15 PM" },
  { id:"e8",  title:"Pharmacokinetics Paper",     course:"NUR 310", start: new Date(y,m,16,9,0),  end: new Date(y,m,16,10,0), type:"assignment", pts:60, instructor:"Dr. Kim Patel",    email:"k.patel@pharm.edu",  room:"NUR 102 · MWF 10:00-11:15 AM" },
  { id:"e9",  title:"SBAR Case Study",            course:"NUR 315", start: new Date(y,m,18,9,0),  end: new Date(y,m,18,10,0), type:"assignment", pts:50, instructor:"Dr. Mark Chen",    email:"m.chen@medsurg.edu", room:"SIM 101 · MW 8:00-11:00 AM" },
  { id:"e10", title:"Labor & Delivery Case Study",course:"NUR 320", start: new Date(y,m,19,9,0),  end: new Date(y,m,19,10,0), type:"assignment", pts:50, instructor:"Dr. Lena Foster",   email:"l.foster@nur.edu",   room:"NUR 205 · TR 1:00-2:15 PM" },
  { id:"e11", title:"Research Paper Draft",       course:"BIO 220", start: new Date(y,m,20,10,0), end: new Date(y,m,20,11,0), type:"assignment", pts:80, instructor:"Dr. James Reed",    email:"j.reed@bio.edu",     room:"BIO 301 · TR 11:00-12:15 PM" },
  { id:"e12", title:"Midterm Exam",               course:"NUR 201", start: new Date(y,m,21,9,0),  end: new Date(y,m,21,11,0), type:"exam",       pts:100,instructor:"Dr. Sandra Mills",  email:"s.mills@nursing.edu", room:"SCI 204 · MWF 9:00-10:15 AM" },
  { id:"e13", title:"Pharmacology Midterm",       course:"NUR 310", start: new Date(y,m,22,9,0),  end: new Date(y,m,22,11,0), type:"exam",       pts:100,instructor:"Dr. Kim Patel",    email:"k.patel@pharm.edu",  room:"NUR 102 · MWF 10:00-11:15 AM" },
  { id:"e14", title:"Med-Surg Midterm",           course:"NUR 315", start: new Date(y,m,23,9,0),  end: new Date(y,m,23,11,0), type:"exam",       pts:100,instructor:"Dr. Mark Chen",    email:"m.chen@medsurg.edu", room:"SIM 101 · MW 8:00-11:00 AM" },
  { id:"e15", title:"Pathophysiology Midterm",    course:"BIO 220", start: new Date(y,m,24,10,0), end: new Date(y,m,24,12,0), type:"exam",       pts:100,instructor:"Dr. James Reed",    email:"j.reed@bio.edu",     room:"BIO 301 · TR 11:00-12:15 PM" },
  { id:"e16", title:"Maternal Nursing Midterm",   course:"NUR 320", start: new Date(y,m,25,9,0),  end: new Date(y,m,25,11,0), type:"exam",       pts:100,instructor:"Dr. Lena Foster",   email:"l.foster@nur.edu",   room:"NUR 205 · TR 1:00-2:15 PM" },
  { id:"e17", title:"Care Plan Reflection",       course:"NUR 201", start: new Date(y,m,28,9,0),  end: new Date(y,m,28,10,0), type:"assignment", pts:40, instructor:"Dr. Sandra Mills",  email:"s.mills@nursing.edu", room:"SCI 204 · MWF 9:00-10:15 AM" },
];

export const TYPE_COLORS = {
  lab:        { bg:"#DBEAFE", text:"#1D4ED8", border:"#BFDBFE" },
  quiz:       { bg:"#FEE2E2", text:"#B91C1C", border:"#FECACA" },
  exam:       { bg:"#FEF3C7", text:"#92400E", border:"#FDE68A" },
  assignment: { bg:"#D1FAE5", text:"#065F46", border:"#A7F3D0" },
  reading:    { bg:"#EDE9FE", text:"#5B21B6", border:"#DDD6FE" },
};

export const COURSE_COLOR = (name) => COURSES.find(c => c.name === name)?.color ?? "#6B7280";

export const UPLOADED_SYLLABI = [
  { name:"Fundamentals_of_Nursing_Syllabus.pdf", course:"NUR 201", size:"2.4 MB", status:"done" },
  { name:"Pharmacology_Syllabus.pdf",             course:"NUR 310", size:"1.8 MB", status:"done" },
  { name:"Med_Surg_Nursing_Syllabus.pdf",         course:"NUR 315", size:"3.1 MB", status:"done" },
  { name:"Pathophysiology_Syllabus.pdf",          course:"BIO 220", size:"2.0 MB", status:"done" },
  { name:"Maternal_Nursing_Syllabus.pdf",         course:"NUR 320", size:"1.5 MB", status:"pending" },
];

export const STATS = [
  { value:"3.67", label:"Overall GPA",          sub:"+0.04 this week",   icon:"🎓", color:"#3B82F6" },
  { value:"3/17", label:"Completed assignments", sub:"this semester",     icon:"✅", color:"#10B981" },
  { value:"6",    label:"Upcoming due this week",sub:"upcoming",          icon:"⏰", color:"#F59E0B" },
  { value:"5",    label:"Courses this semester", sub:"this semester",     icon:"📚", color:"#8B5CF6" },
];
