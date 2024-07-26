import { FAQAccordions } from "@/components/FAQ/FAQAccordions";
import ModeSelect from "@/components/Homepage/ModeSelect";
import Results from "@/components/Homepage/Results";
import Tiptap from "@/components/Homepage/TipTapEditor";
import Image from "next/image";
import { humanizerAPI } from "../../utils/humanize";
import {
  ArrowRightIcon,
  InformationCircleIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import Tooltips from "@/components/Homepage/Tooltips";
import HomeCarousel from "@/components/Homepage/HomeCarousel";

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

const imageSources = [
  {
    alt: "Buzzfeed",
    src: "https://cdn.bypassai.ai/web-cdn/bypass/public/apple/images/index/buzzfeed.png",
    width: 152,
    height: 32,
  },
  {
    alt: "Wired",
    src: "https://cdn.bypassai.ai/web-cdn/bypass/public/apple/images/index/wired.png",
    width: 100,
    height: 32,
  },
  {
    alt: "CNET",
    src: "https://cdn.bypassai.ai/web-cdn/bypass/public/apple/images/index/cnet.png",
    width: 89,
    height: 32,
  },
  {
    alt: "Digital Trends",
    src: "https://cdn.bypassai.ai/web-cdn/bypass/public/apple/images/index/digitaltrends.png",
    width: 144,
    height: 32,
  },
  {
    alt: "Action News",
    src: "https://cdn.bypassai.ai/web-cdn/bypass/public/apple/images/index/action-news.png",
    width: 66,
    height: 32,
  },
  {
    alt: "Make Use Of",
    src: "https://cdn.bypassai.ai/web-cdn/bypass/public/apple/images/index/mud-make-use-of.png",
    width: 88,
    height: 32,
  },
  {
    alt: "iGeeksBlog",
    src: "https://cdn.bypassai.ai/web-cdn/bypass/public/apple/images/index/igeeksblg.png",
    width: 115,
    height: 32,
  },
  {
    alt: "The Hacker News",
    src: "https://cdn.bypassai.ai/web-cdn/bypass/public/apple/images/index/the-hacker-news.png",
    width: 164,
    height: 32,
  },
];

const Home = () => {
  const shortTest = `Economically, globalization has enabled countries to tap into larger markets, leading to increased trade and investment. Companies can source materials and labor from wherever they are most cost-effective, which ultimately lowers prices and increases the variety of products available to consumers. For some nations, it has catalyzed growth and development, creating jobs and lifting millions out of poverty. On the other hand, it has also led to significant challenges, such as the erosion of local industries unable to compete with international corporations and the exploitation of labor in developing countries.`;

  const benefits = [
    {
      step: "1. Upload Your Content",
      description:
        "Start by typing or pasting your AI-generated content into GrubbyAI's intuitive interface.",
    },
    {
      step: "2. Let GrubbyAI Do Its Magic",
      description:
        "With a single click, GrubbyAI will transform your content into undetectable, authentic content.",
    },
    {
      step: "3. Get Undetectable Output",
      description:
        "Get the humanized AI text that can beat AI detection and secure ranking content.",
    },
  ];

  const advantages = [
    {
      title: "Undetectable Humanized Content",
      rating: 5,
      otherRating: 1,
      content:
        "Generate text that closely resembles human writing, making it hard for AI detectors to tell if it's generated by AI.",
    },
    {
      title: "Original Meaning Retained",
      rating: 5,
      otherRating: 1,
      content:
        "Ensure that the core message and meaning of the content remain intact, so it doesn't lose its purpose or clarity",
    },
    {
      title: "Plagiarism Free Content",
      rating: 5,
      otherRating: 1,
      content:
        "Guarantee 100% originality of the output text, so you can bypass not just AI detection, but also plagiarism detection.",
    },
    {
      title: "Zero Spam",
      rating: 5,
      otherRating: 1,
      content:
        "Ensure the humanized content will not trigger spam filters, so you can freely use it for email marketing or advertisements.",
    },
    {
      title: "SEO-Friendly Outputs",
      rating: 5,
      otherRating: 1,
      content:
        "The output quality can meet the content requirements of Google, which will boost your rankings.",
    },
  ];

  const audiences = [
    {
      title: "Students",
      description:
        "Bypass AI can help students ensure their works are undetectable by both AI detectors and plagiarism checkers. So they can confidently submit them and comply with integrity policies of their schools or colleges.",
      imgSrc:
        "https://cdn.bypassai.ai/web-cdn/bypass/public/apple/images/index/students.png",
    },
    {
      title: "Bloggers and Journalists",
      description:
        "Our AI humanizer can help bloggers and journalists who want to ensure their AI-assisted content is not flagged by platforms or search engines that might penalize AI-generated content.",
      imgSrc:
        "https://cdn.bypassai.ai/web-cdn/bypass/public/apple/images/index/blogger.png",
    },
    {
      title: "Marketing Professionals",
      description:
        "Social media managers and digital marketers can benefit from Bypass AI. We humanize AI text for their marketing copy to make it appear organic and less likely to trigger spam filters.",
      imgSrc:
        "https://cdn.bypassai.ai/web-cdn/bypass/public/apple/images/index/professional.png",
    },
    {
      title: "Entrepreneurs",
      description:
        "Business owners who rely on AI for creating content can use our AI humanizer. We add a personal touch in their content, and help them maintain smooth communications with their customers.",
      imgSrc:
        "https://cdn.bypassai.ai/web-cdn/bypass/public/apple/images/index/entrepreneurs.png",
    },
  ];

  const detectors = [
    {
      name: "GPTZero",
      logoClass: "i-com--logo-gptzero",
      imgSrc:
        "https://cdn.bypassai.ai/web-cdn/bypass/public/apple/images/index/gptzero-banner.jpg",
      imgAlt: "GPTZero",
      testSample: "GPTZero Test Sample",
      description: "Bypass GPTZero",
    },
    {
      name: "Originality.ai",
      logoClass: "i-com--logo-originality",
      imgSrc:
        "https://cdn.bypassai.ai/web-cdn/bypass/public/apple/images/index/originality-banner.jpg",
      imgAlt: "Originality.ai",
      testSample: "Originality.ai Test Sample",
      description: "Bypass Originality.ai",
    },
    {
      name: "ZeroGPT",
      logoClass: "i-com--logo-zerogpt",
      imgSrc:
        "https://cdn.bypassai.ai/web-cdn/bypass/public/apple/images/index/zerogpt-banner.jpg",
      imgAlt: "ZeroGPT",
      testSample: "ZeroGPT Test Sample",
      description: "Bypass ZeroGPT",
    },
    {
      name: "Turnitin",
      logoClass: "i-com--logo-turnitin",
      imgSrc:
        "https://cdn.bypassai.ai/web-cdn/bypass/public/apple/images/index/turnitin-banner.jpg",
      imgAlt: "Turnitin",
      testSample: "Turnitin Test Sample",
      description: "Bypass Turnitin",
    },
    {
      name: "Winston AI",
      logoClass: "i-com--logo-winston-ai",
      imgSrc:
        "https://cdn.bypassai.ai/web-cdn/bypass/public/apple/images/index/winston-banner.jpg",
      imgAlt: "Winston AI",
      testSample: "Winston AI Test Sample",
      description: "Bypass Winston AI",
      active: true,
    },
    {
      name: "Content at Scale",
      logoClass: "i-com--logo-content-at-scale",
      imgSrc:
        "https://cdn.bypassai.ai/web-cdn/bypass/public/apple/images/index/content-at-scale-banner.jpg",
      imgAlt: "Content at Scale",
      testSample: "Content at Scale Test Sample",
      description: "Bypass Content at Scale",
    },
    {
      name: "Copyleaks",
      logoClass: "i-com--logo-copyleaks",
      imgSrc:
        "https://cdn.bypassai.ai/web-cdn/bypass/public/apple/images/index/copyleaks-banner.jpg",
      imgAlt: "Copyleaks",
      testSample: "Copyleaks Test Sample",
      description: "Bypass Copyleaks",
    },
  ];

  return (
    <main className="min-h-screen">
      <div className="absolute -z-10 top-0 w-screen h-screen bg-gradient-to-r from-[#48629b] to-[#622d91]"></div>
      <div className="z-10 h-full bg-gradient-to-r from-[#48629b] to-[#622d91] text-white relative min-h-screen px-4 lg:pb-[109px] lg:pt-[128px] py-16">
        <h2 className="text-4xl w-fit mx-auto font-extrabold text-center hero_gradient text-transparent">
          Grubby AI Detection
        </h2>
        <p className="mb-12 mt-3 text-center text-white sm:text-base md:mb-8">
          Make your AI text 100% undetectable with GrubbyAI - your trusted AI
          detection remover to create plagiarism-free, human-like text.
        </p>
        <div className="mx-auto h-full w-full max-w-[1200px]">
          <div className="flex w-full flex-col overflow-hidden rounded-lg">
            <div className="relative flex flex-col lg:flex-row">
              <div className="flex-1 h-fit w-full">
                <div className="flex min-h-[48px] items-center bg-blue-600 px-6 py-2 text-sm text-white "></div>
                <div className="relative flex h-[500px] overflow-y-auto flex-col bg-white pb-4 md:rounded-b-none 2xl:h-[410px]">
                  <div className="group relative flex-1 px-4 pt-4">
                    <div className="w-full h-full">
                      <Tiptap />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 h-fit">
                <div className="flex min-h-[48px] items-center bg-blue-600 px-6 py-2 text-sm text-white justify-end lg:rounded-none">
                  <div className="flex w-fit cursor-pointer items-center gap-x-1 text-[#DBD9FB] hover:text-[#c1bff4]">
                    <span className="i-cus--a-facehappy h-4 w-4"></span>
                    <span className="text-sm">Usage guidelines</span>
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

      <div className="mx-auto lg:flex max-w-[1232px]  flex-wrap text-center lg:gap-x-10 px-4 lg:pt-9 grid grid-cols-2 gap-x-4 gap-y-4 pt-5">
        {imageSources.map(({ alt, src, width, height }) => (
          <img
            key={alt}
            alt={alt}
            loading="lazy"
            width={width}
            height={height}
            decoding="async"
            className="h-8 shrink-0 mx-auto object-cover opacity-50 grayscale hover:opacity-100 hover:grayscale-0"
            src={src}
            style={{ color: "transparent" }}
          />
        ))}
      </div>

      <div className="relative mx-auto lg:mt-[164px] max-w-[1200px] mt-14">
        <div className="relative rounded-3xl bg-[#eeedfd] lg:px-[270px] lg:py-[106px] md:rounded-2xl">
          <div className="relative z-[1] mx-auto max-w-[592px] p-8 md:max-w-full text-center">
            <h2 className="lg:text-left text-xl font-extrabold md:text-xl lg:text-4xl">
              ULTIMATE AI Bypasser &amp; Humanizer
            </h2>
            <p className="lg:text-left text-base mt-6 md:mt-4">
              GrubbyAI is a powerful AI humanizer and AI detection remover to
              help you effectively bypass AI detections. Using advanced
              algorithms, our anti AI detector rewriter transforms your
              AI-generated content into plagiarism-free, human-like text
              undetectable by all AI detectors.
            </p>
          </div>
          <img
            alt="All-in-One AI Checker and AI Humanizer"
            loading="lazy"
            width="338"
            height="397"
            decoding="async"
            className="absolute -left-24 bottom-0 lg:block hidden lg:-left-32"
            src="https://cdn.bypassai.ai/web-cdn/bypass/public/apple/images/person-left.png"
          />
          <img
            alt="person banner"
            loading="lazy"
            width="318"
            height="502"
            decoding="async"
            className="absolute -right-16 bottom-0 max-h-[502px] hidden lg:block lg:-bottom-32 xl:-bottom-10"
            src="https://cdn.bypassai.ai/web-cdn/bypass/public/apple/images/person-right.png"
          />
        </div>
      </div>

      <div className="mx-auto max-w-[1366px] px-4 lg:pb-[162px] lg:pt-[180px] pb-12 pt-20">
        <h2 className="font-extrabold text-xl text-blue-600 text-center lg:text-4xl">
          Why You Need an AI Humanizer
        </h2>
        <p className="pt-3 text-center lg:pt-2 lg:text-sm">
          As a 100% undetectable AI detection bypasser, GrubbyAI ensures your
          content safety in many cases.
        </p>
        <span
          className="mx-auto mb-8 mt-6 flex h-2  lg:w-[120px] w-full z-50 rounded-full"
          style={{
            background:
              "linear-gradient(to right, rgb(201, 255, 66) 0.02%, rgb(46, 255, 255) 36.48%, rgb(255, 223, 108) 67.03%, rgb(217, 64, 255) 99.74%);",
          }}></span>
        <div className="flex w-full items-center lg:gap-x-[58px] rounded-3xl bg-[#F4F5F9] lg:px-14 lg:py-10 lg:flex-row flex-col gap-6 lg:rounded-xl px-6 py-5">
          <div className="max-w-[400px] ">
            <div className="bg-blue-600 lg:h-10 lg:w-10 rounded-full bg-opacity-10 h-8 w-8">
              <span className="font-bold text-blue-600 text-4xl italic">1</span>
            </div>
            <p className="pt-3 lg:text-2xl text-lg font-bold ">
              Bypass Inaccurate Detectors
            </p>
            <p className="pt-2 text-[#555272] lg:pt-3 text-base ">
              AI detectors, including the well-known GPTZero,{" "}
              <a
                href="https://www.reddit.com/r/ChatGPT/comments/1155shx/gpt_zero_is_not_accurate_at_all/"
                target="_blank"
                rel="noreferrer nofollow"
                className="text-primary hover:underline">
                often flag content entirely written by humans as AI
              </a>
              . GrubbyAI helps you avoid getting these wrongful detection
              results. So you can use or submit your content more confidently.
            </p>
          </div>
          <img
            alt="Bypass Inaccurate Detectors"
            loading="lazy"
            width="764"
            height="448"
            decoding="async"
            className="rounded-[20px] shadow-[0_2px_10px_0_rgba(0,57,89,0.14)]"
            src="https://cdn.bypassai.ai/web-cdn/bypass/public/apple/images/index/inaccurate-detectors.jpg"
          />
        </div>

        <div className="lg:mt-[30px] flex items-center lg:gap-[30px] mt-5 lg:flex-row flex-col gap-5">
          <div className="rounded-3xl bg-[#F4F5F9] lg:px-14 lg:py-9 lg:rounded-xl px-6 py-5">
            <div className="bg-blue-600 h-10 w-10 rounded-full bg-opacity-10 lg:h-8 lg:w-8">
              <span className="font-bold text-blue-600 text-4xl italic">2</span>
            </div>
            <p className="pt-3 lg:text-2xl text-lg font-bold ">
              Remove ChatGPT Watermarks
            </p>
            <p className="pt-2 text-[#555272] lg:pt-3 text-base ">
              ChatGPT{" "}
              <a
                href="https://twitter.com/tomgoldsteincs/status/1618287665006403585"
                target="_blank"
                rel="noreferrer nofollow"
                className="text-primary hover:underline">
                embeds watermarks to the text they generated
              </a>
              . But our AI humanizer can instantly replace the wording pattern
              for watermarking with an appropriate alternative that mimics human
              writing. So no more worry over getting spotted!
            </p>
            <img
              alt="Remove ChatGPT Watermarks"
              loading="lazy"
              width="540"
              height="580"
              decoding="async"
              className="mt-4 rounded-[20px] shadow-[0_2px_10px_0_rgba(0,57,89,0.14)]"
              src="https://cdn.bypassai.ai/web-cdn/bypass/public/apple/images/index/remove-watermark.jpg"
            />
          </div>
          <div className="rounded-3xl bg-[#F4F5F9] lg:px-14 lg:py-9 lg:rounded-xl px-6 py-5">
            <div className="bg-blue-600 h-10 w-10 rounded-full bg-opacity-10 lg:h-8 lg:w-8">
              <span className="font-bold text-blue-600 text-4xl italic">3</span>
            </div>
            <p className="pt-3 lg:text-2xl text-lg font-bold ">
              Avoid Google Penalties
            </p>
            <p className="pt-2 text-[#555272] lg:pt-3 text-base ">
              Google{" "}
              <a
                href="https://twitter.com/searchliaison/status/1755646649437917460"
                target="_blank"
                rel="noreferrer nofollow"
                className="text-primary hover:underline">
                hates spammy AI-generated content
              </a>
              . By processing your AI content with GrubbyAI, it will be
              impossible to get detected and sound more natural. It will meet
              the content guidelines and be less likely to incur Google
              penalties.
            </p>
            <img
              alt="Avoid Google Penalties"
              loading="lazy"
              width="540"
              height="580"
              decoding="async"
              className="mt-4 rounded-[20px] shadow-[0_2px_10px_0_rgba(0,57,89,0.14)]"
              src="https://cdn.bypassai.ai/web-cdn/bypass/public/apple/images/index/avoid-penalties.jpg"
            />
          </div>
        </div>
        <button className="bg-blue-600 hover:bg-blue-400 group relative items-center mx-auto mt-[65px] flex lg:h-20 gap-4 rounded-full lg:py-[22px] py-4 w-full lg:w-1/2 justify-center">
          <img
            alt="Upgrade now"
            loading="lazy"
            width="195"
            height="113"
            decoding="async"
            className="absolute bottom-0 lg:flex hidden left-8"
            src="https://cdn.bypassai.ai/web-cdn/bypass/public/apple/images/index/button-woman.png"
          />
          <p className="lg:text-2xl text-lg font-extrabold text-white">
            Upgrade now
          </p>
          <div className="flex lg:h-9 lg:w-9 h-5 w-5 transform items-center justify-center rounded-full bg-white duration-300 group-hover:translate-x-6 lg:group-hover:translate-x-1">
            <span className="text-blue-600 block lg:h-6 lg:w-6 h-4 w-4">
              <ArrowRightIcon />
            </span>
          </div>
        </button>
      </div>

      <HomeCarousel />

      <div className="mx-auto max-w-[1232px] px-4 lg:py-[140px] text-center py-12">
        <h2 className="text-display font-extrabold text-2xl lg:text-4xl">
          AI Humanizer for All
        </h2>
        <p className="lg:pt-3 lg:text-lg text-[#555272] pt-2 text-base">
          Whoever you are, Bypass AI is able to help you get more freedom in
          your AI-assisted content creation process.
        </p>
        <div className="grid justify-center w-fit mx-auto lg:grid-cols-2 lg:gap-6 lg:pt-9 grid-cols-1 gap-4 pt-4">
          {audiences.map(({ title, description, imgSrc }) => (
            <div
              key={title}
              className="flex max-w-[580px]  h-full bg-[#EEEDFD] items-end overflow-hidden rounded lg:max-w-full text-left">
              <img
                alt={title}
                loading="lazy"
                width="200"
                height="200"
                decoding="async"
                className="hidden lg:block "
                src={imgSrc}
              />
              <div className="h-[200px]  p-5 lg:h-full">
                <p className="text-xl font-bold">{title}</p>
                <p className="pt-2 text-[#555272]">{description}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="bg-blue-600 hover:bg-blue-400 mx-auto mt-9 w-fit rounded px-6 py-3 text-xl font-bold text-white">
          <Link href="/pricing">Upgrade now</Link>
        </button>
      </div>

      <div className="relative px-4 py-[120px] lg:py-12">
        <div className="relative z-[2] mx-auto max-w-[982px] text-center text-white">
          <h2 className="lg:text-3xl text-xl font-extrabold  text-white">
            What Makes GrubbyAI the Top AI Detection Remover
          </h2>
          <p className="mt-3 ">
            GrubbyAI stands out from other AI detection bypassers in several
            ways that make it a powerful tool to bypass AI detection:
          </p>
        </div>
        <div className="relative z-[2] mx-auto mt-9 max-w-[992px] overflow-x-auto rounded-xl border border-[#6456FF] text-white">
          <table>
            <tbody>
              <tr className="text-lg font-bold">
                <td className="w-[430px]">&nbsp;</td>
                <td className="w-[280px] px-[10px] py-[18px] text-sm lg:text-base text-center lg:px-2 lg:py-3">
                  GrubbyAI
                </td>
                <td className="w-[280px] px-[10px] py-[18px] text-sm lg:text-base text-center lg:whitespace-nowrap lg:px-2 lg:py-3">
                  Other AI bypassers
                </td>
              </tr>
              {advantages.map(
                ({ title, rating, otherRating, content }, index) => (
                  <tr
                    key={title}
                    className={`${
                      index % 2 ? "bg-[#F4F5F9] bg-opacity-20" : ""
                    }`}>
                    <td className="lg:w-[430px] flex  w-[215px] items-center gap-2 py-[18px] px-[10px]">
                      <p className="lg:text-lg text-base w-5/6 font-bold">
                        {title}
                      </p>
                      <Tooltips content={content} />
                    </td>
                    <td className="lg:w-[280px] px-[10px] py-[18px] text-center lg:px-2 lg:py-3 lg:text-sm">
                      <div className="flex items-center justify-center gap-x-1.5 lg:gap-x-1">
                        {Array(rating).fill(
                          <span className="lg:h-[28px] lg:w-[28px] w-[14px] h-[14px]  text-[#FFD600]">
                            <StarIcon />
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="lg:w-[280px] px-[10px] py-[18px] text-center lg:px-2 lg:py-3 lg:text-sm">
                      <div className="flex items-center justify-center gap-x-1.5 lg:gap-x-1">
                        {Array(otherRating).fill(
                          <span className="lg:h-[28px] lg:w-[28px] w-[14px] h-[14px] text-[#FFD600]">
                            <StarIcon />
                          </span>
                        )}
                        {Array(5 - otherRating).fill(
                          <span className="lg:h-[28px] lg:w-[28px] w-[14px] h-[14px] text-[#FFD600]">
                            <StarIcon fill="none" stroke="currentColor" />
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
        <button className="bg-blue-600 relative z-[2] mx-auto mt-9 flex h-14 w-fit min-w-[180px] items-center justify-center rounded px-6  font-bold text-white hover:bg-blue-400 lg:mt-4 lg:h-12 text-base">
          <Link href="/pricing">Upgrade now</Link>
        </button>
        <img
          alt="How Does GrubbyAI Stand Out?"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 object-cover w-full h-full"
          src="https://cdn.bypassai.ai/web-cdn/bypass/public/apple/images/banner.jpg"
          style={{ color: "transparent" }}
        />
      </div>

      <div className="mx-auto flex gap-5 flex-col max-w-[1138px] items-center gap-x-[100px] p-4 py-12 lg:pt-[120px] lg:flex-row">
        <img
          alt="Not Just AI Detection: We Pass Plagiarism Checks Too!"
          loading="lazy"
          width="490"
          height="364"
          decoding="async"
          className="lg:order-1 order-2 my-6 lg:my-0"
          src="https://cdn.bypassai.ai/web-cdn/bypass/public/apple/images/index/not-just.jpg"
        />
        <div className="max-w-[520px] lg:max-w-full">
          <h2 className="text-display text-xl lg:text-4xl font-extrabold">
            Not Just AI Detection: We Pass Plagiarism Checks Too!
          </h2>
          <p className="pt-3 text-[#555272]">
            Your content safety is our top priority. Our advanced anti AI
            detector technology produces undetectable text that surely contains
            no copied or duplicated content. The humanized text you&apos;ll get
            will pass not only AI detections, but also all plagiarism checks.
          </p>
          <button className="text-blue-600 border-blue-600 hover:bg-blue-600 mt-9 rounded border px-6 py-3 text-base lg:text-xl font-bold hover:text-white">
            Upgrade now
          </button>
        </div>
      </div>

      <div className="relative lg:pb-[140px] lg:pt-[170px] py-12">
        <div className="relative z-[1] mx-auto max-w-[928px] px-4 text-center">
          <h2 className="text-display lg:text-4xl font-extrabold text-2xl">
            Multilingual AI Humanizer
          </h2>
          <p className="pt-3 text-[#555272] lg:pt-2 lg:text-sm">
            Want to get undetectable writing in other languages? Bypass AI can
            also help! We can humanize AI text in over 30 languages, so you can
            freely create undetectable content catered to a global audience.
          </p>
          <ul className="grid lg:grid-cols-6 grid-cols-3 gap-4 pt-12  lg:pt-5 lg:text-center  ">
            {[
              "Arabic",
              "Bengali",
              "Chinese",
              "Danish",
              "Dutch",
              "English",
              "Finnish",
              "French",
              "German",
              "Greek",
              "Hebrew",
              "Hindi",
              "Hungarian",
              "Indonesian",
              "Italian",
              "Japanese",
              "Korean",
              "Lithuanian",
              "Malay",
              "Norwegian",
              "Persian",
              "Polish",
              "Portuguese",
              "Russian",
              "Spanish",
              "Swedish",
              "Tamil",
              "Thai",
              "Turkish",
              "Ukrainian",
            ].map((language) => (
              <li key={language} className="text-[#555272]">
                {language}
              </li>
            ))}
          </ul>
          <button className="text-blue-600 border-blue-600 hover:bg-blue-600 mx-auto lg:mt-9 w-fit rounded border lg:px-6 py-3 lg:text-xl font-bold hover:text-white mt-4 px-4 text-base">
            <Link href="/pricing">Upgrade now</Link>
          </button>
        </div>
        <img
          alt="Multilingual AI Humanizer"
          loading="lazy"
          width="964"
          height="344"
          decoding="async"
          className="absolute bottom-0 ltr:right-0 rtl:left-0"
          src="https://cdn.bypassai.ai/web-cdn/bypass/public/apple/images/index/remover.png"
          style={{ color: "transparent" }}
        />
      </div>

      <div className="bg-[#EEEDFD] py-8 lg:py-[120px]">
        <div className="mx-auto max-w-[1232px] px-4">
          <h2 className=" text-xl lg:text-4xl font-extrabold lg:text-center">
            Bypass AI Detection in 3 Simple Steps
          </h2>
          <p className=" mt-3 lg:text-center">
            Using our AI detection remover is simple - just follow the steps
            below.
          </p>
          <div className="flex flex-col items-center gap-8 gap-x-[120px] pt-3 lg:pt-12 lg:flex-row">
            <img
              className="order-2 lg:order-1 w-2/3 max-w-[418px] lg:w-[418px]"
              alt="Humanize AI Text in 3 Simple Steps"
              loading="lazy"
              width="418"
              height="340"
              decoding="async"
              src="https://cdn.bypassai.ai/web-cdn/bypass/public/apple/images/ai-detection.png"
              style={{ color: "transparent" }}
            />
            <div className="lg:w-[662px] w-full flex-1 lg:order-2">
              <ul className="space-y-4">
                {benefits.map(({ step, description }) => (
                  <li key={step}>
                    <h3 className="text-display text-lg lg:text-xl font-bold">
                      {step}
                    </h3>
                    <p className="text-sm lg:text-lg">{description}</p>
                  </li>
                ))}
              </ul>
              <button className="bg-blue-600 mt-9 flex h-14 w-fit min-w-[180px] items-center justify-center rounded px-6 text-base lg:text-xl font-bold text-white hover:bg-blue-400">
                <Link href="/pricing">Upgrade now</Link>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white flex flex-col py-6 justify-center">
        <h2 className="font-bold text-2xl w-fit mx-auto">FAQs</h2>
        <div className="px-6 max-w-[1200px] w-full mx-auto">
          <FAQAccordions faqs={FAQs} />
        </div>
      </div>

      <div className="lg:mt-[128px] lg:pb-20  my-12 px-4">
        <div className="bg-blue-600 relative mx-auto max-w-[1200px] rounded-[32px] lg:py-[86px]  pb-12 pt-12">
          <img
            alt="Bypass AI Detection With BypassGPT Effortlessly"
            loading="lazy"
            width="274"
            height="196"
            decoding="async"
            className="absolute bottom-0 left-0 hidden md:block"
            src="https://cdn.bypassai.ai/web-cdn/bypass/public/apple/images/cta-right.png"
            style={{ color: "transparent" }}
          />
          <img
            alt="Bypass AI Detection With BypassGPT Effortlessly"
            loading="lazy"
            width="274"
            height="196"
            decoding="async"
            className="absolute -right-16 bottom-0 hidden md:block"
            src="https://cdn.bypassai.ai/web-cdn/bypass/public/apple/images/cta-left.png"
            style={{ color: "transparent" }}
          />
          <div className="relative z-[2] mx-auto max-w-[912px] px-4 text-center text-white sm:px-3 lg:pt-6">
            <h2 className="text-xl font-extrabold md:text-xl lg:text-2xl text-white">
              Bypass AI Detectors Today with GrubbyAI
            </h2>
            <p className="xs:mt-2 mx-auto mt-3 max-w-[720px] text-base md:max-w-[460px] md:text-sm">
              If you&apos;re looking for an AI detection remover that truly
              works, GrubbyAI is the number one option. Click here to find out
              more.
            </p>
            <button className="text-blue-600 mx-auto mt-8 block w-fit rounded bg-white px-[38px] py-3 text-base lg:text-xl font-bold hover:bg-gray-200 hover:shadow-lg sm:mt-5 sm:px-6 sm:text-base">
              <Link href="/pricing">Upgrade now</Link>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
