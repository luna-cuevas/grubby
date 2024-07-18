import { FAQAccordions } from "@/components/FAQ/FAQAccordions";
import ModeSelect from "@/components/Homepage/ModeSelect";
import Results from "@/components/Homepage/Results";
import Tiptap from "@/components/Homepage/TipTapEditor";
import Image from "next/image";
import { humanizerAPI } from "../../utils/humanize";

const FAQs = [
  {
    question: "What is an AI detection remover?",
    answer:
      "AI detection remover or AI bypasser is an undetectable AI writing tool designed to help users bypass AI detectors by producing AI content with 100% human scores.",
  },
  {
    question: "Why is it important to bypass AI detection?",
    answer:
      "It's important for you to know how to bypass AI detection for various reasons.\n\nIf you're a student, you may want to make sure your works can pass the stringent, oftentimes inaccurate AI checkers and you can adhere to your school and university guidelines.\n\nIf you're an online content creator, blogger or SEO marketer, your content being able to bypass AI detectors means it's less likely to get penalized by Google, and more to get indexed and rank high.\n\nIf you're an advertiser, a good AI detection remover like GrubbyAI helps your content read more natural and avoid being flagged as spam.",
  },
  {
    question: "How to make AI text undetectable?",
    answer:
      "To make AI-generated text undetectable, you can try techniques like adding data or updated facts to your content, making the tone more casual or humorous, or using AI detection bypass tools like GrubbyAI to humanize AI text.",
  },
  {
    question:
      "What is GrubbyAI? How to bypass AI detectors with this AI humanizer?",
    answer:
      "GrubbyAI is an AI detection remover that can humanize AI text and make it truly undetectable by AI detectors. To use it, all you need to do is let the tool rewrite your AI-generated content and you will get text that can easily bypass AI detection.",
  },
  {
    question: "What languages does GrubbyAI support?",
    answer:
      "GrubbyAI can not only humanize AI text in English, but also supports humanization of more than 30 languages. So you can freely create undetectable AI writing with GrubbyAI to reach a global audience.",
  },
  {
    question: "Is it free to use GrubbyAI to bypass AI detectors?",
    answer:
      "GrubbyAI offers every new user free words to humanize AI text. And you need to subscribe to our paid plans to unlock more words and features. Check out our pricing page for more details.",
  },
];

export default async function Home() {
  const shortTest = `Economically, globalization has enabled countries to tap into larger markets, leading to increased trade and investment. Companies can source materials and labor from wherever they are most cost-effective, which ultimately lowers prices and increases the variety of products available to consumers. For some nations, it has catalyzed growth and development, creating jobs and lifting millions out of poverty. On the other hand, it has also led to significant challenges, such as the erosion of local industries unable to compete with international corporations and the exploitation of labor in developing countries.`;

  return (
    <main className=" min-h-screen ">
      <div className="absolute  -z-10 top-0 w-screen h-screen bg-gradient-to-r from-[#48629b] to-[#622d91]"></div>
      <div className="z-10 h-full bg-gradient-to-r from-[#48629b] to-[#622d91] text-white relative min-h-screen px-4 pb-[109px] pt-[128px] md:pb-16 md:pt-20 2xl:pt-[80px]">
        <h2 className="text-4xl w-fit mx-auto font-extrabold text-center hero_gradient text-transparent">
          Grubby AI Detection
        </h2>
        <p className="mb-12 mt-3 text-center text-white sm:text-base md:mb-8">
          Make your AI text 100% undetectable with BypassAI - your trusted AI
          detection remover to create plagiarism-free, human-like text.
        </p>
        <div className="mx-auto h-full w-full max-w-[1200px]">
          <div className=" flex w-full flex-col  overflow-hidden rounded-lg">
            <div className="relative flex flex-col lg:flex-row">
              <div className="flex-1 h-fit w-full">
                <div className="flex min-h-[48px] items-center bg-blue-600 px-6 py-2 text-sm text-white ">
                  <div className="flex gap-4">
                    <label htmlFor="mode">Mode: </label>
                    <ModeSelect />
                  </div>
                </div>
                <div className="relative flex h-[500px] overflow-y-auto flex-col bg-white pb-4 md:rounded-b-none 2xl:h-[410px]">
                  <div className="group relative flex-1 px-4 pt-4">
                    <div className="w-full h-full">
                      <Tiptap />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 h-fit">
                <div className="flex min-h-[48px] items-center bg-blue-600 px-6 py-2 text-sm text-white justify-end  lg:rounded-none">
                  <div className="">
                    <div></div>
                    <div className="flex w-fit cursor-pointer items-center gap-x-1 text-[#DBD9FB] hover:text-[#c1bff4]">
                      <span className="i-cus--a-facehappy h-4 w-4"></span>
                      <span className="text-sm">Usage guidelines</span>
                    </div>
                  </div>
                </div>
                <div className="relative h-[500px] bg-[#f4f5f9] md:rounded-none 2xl:h-[410px]">
                  <div className="h-full w-full">
                    <Results />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white flex flex-col py-6 justify-center">
        <h2 className="font-bold text-2xl w-fit mx-auto">FAQs</h2>
        <div className="px-6 max-w-[800px] w-full mx-auto">
          <FAQAccordions faqs={FAQs} />
        </div>
      </div>
    </main>
  );
}
