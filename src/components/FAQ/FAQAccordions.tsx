"use client";
import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

type Props = {
  faqs: {
    question: string;
    answer: string;
  }[];
};

function Icon({ id, open }: { id: number; open: number | null }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

export function FAQAccordions({ faqs }: Props) {
  // Change the initial state to null to represent no items being open
  const [open, setOpen] = React.useState<number | null>(null);

  const handleOpen = (value: number) => setOpen(open === value ? null : value);

  return faqs.map((faq, index) => (
    <Accordion
      open={open === index}
      key={index}
      className="border-b border-gray-200">
      <AccordionHeader
        onClick={() => handleOpen(index)}
        className="flex justify-between items-center py-4">
        <h3 className="text-lg w-full font-semibold">{faq.question}</h3>
        <Icon id={index} open={open} />
      </AccordionHeader>
      <AccordionBody className="py-4">{faq.answer}</AccordionBody>
    </Accordion>
  ));
}
