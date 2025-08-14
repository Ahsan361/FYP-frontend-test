import React from "react";
import ListCard from "../../../components/ui/ListCard";

function FAQSection() {
  const ticketItems = [
  {
    id: 1,
    title: "There are no volunteer opportunities listed on the website. Can you keep my details on file??",
    details: [
      {text: "Volunteer opportunities are advertised on our website. If there are none listed that means we are not currently taking on new volunteers. It is not our policy to keep applications on file because of the large numbers we receive, so please only apply when new opportunities become available. They will appear on this page.", noBullet: true },
      
    ]
  },
  {
    id: 2,
    title: "How old do I need to be to volunteer?",
    details: [
        {text: "All volunteers must be at least 18 years old.", noBullet: true },
    ]
  },
  {
    id: 4,
    title: "How often would I need to volunteer?",
    details: [
      {text: "We offer a range of volunteer opportunities, all with different levels of time commitment and flexibility", noBullet: true }
    ]
  },
  {
    id: 5,
    title: "How long do I need to volunteer for?",
    details: [
        {text: "We have a range of volunteer opportunities with different time commitments. For most visitor-facing roles, you'll be asked to commit to volunteering for a minimum of six months. ", noBullet: true },
    ]
  },
  {
    id: 6,
    title: "Do you offer work experience for school students?",
    details: [
        {text: "We don't run a work experience programme at present.", noBullet: true },
    ]
  },
  {
    id: 7,
    title: "I'm interested in working for the British Museum. Where can I find out about employment opportunities?",
    details: [
      {text: "Employment opportunities are listed on the jobs website(Opens in new window).", noBullet: true },
    ]
  },
  {
    id: 8,
    title: "Can I do an internship at the British Museum?",
    details: [
      {text: "All internships at the British Museum are paid positions that follow a formal recruitment process. They're distinct from volunteering and can be found on the jobs website.", noBullet: true },
    ]
  }
];

  return (
    <ListCard
      title="FAQs"
      items={ticketItems}
    />
  );
}

export default FAQSection;
