import React from "react";

const PrivacyPolicy = () => {
  return (
    <main className="h-full py-20">
      <div className="relative py-20 md:py-12 ">
        <h1 className="relative z-[1] mx-auto max-w-[932px] px-4 lg:text-7xl font-bold text-white  text-4xl text-center">
          Privacy Policy
        </h1>
        <img
          alt="Privacy Policy"
          loading="lazy"
          decoding="async"
          className="object-cover"
          src="https://cdn.bypassai.ai/web-cdn/bypass/public/apple/images/privacy.jpg"
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            inset: 0,
            color: "transparent",
          }}
        />
      </div>
      <div>
        <div className="mx-auto flex flex-col gap-2 mt-12 max-w-[932px] px-4 text-sm sm:mt-6 md:mt-10 AgreementPage_agreement__pEx7o">
          <p>
            We are committed to protecting your privacy. This privacy policy
            explains how we collect, use, and disclose your personal information
            when you use BypassAI. By using BypassAI, you consent to the
            collection, use, and disclosure of your personal information as
            described in this privacy policy.
          </p>
          <h2 className="text-xl font-bold">Information We Collect</h2>
          <p>
            When you use Grubby.ai, we may collect personal information that you
            provide to us, such as your name, email address, and other contact
            information. We may also collect information about your use of
            Grubby.ai, including but not limited to, the date and time of your
            visit, the pages you accessed, and your IP address.
          </p>
          <h2 className="text-xl font-bold">Use of Information</h2>
          <p>
            We may use your personal information to provide you with our
            services, respond to your inquiries, and communicate with you about
            Grubby.ai and its services. We may also use your personal
            information to improve Grubby.ai and its services, conduct research
            and analysis, and comply with our legal obligations.
          </p>
          <h2 className="text-xl font-bold">Disclosure of Information</h2>
          <p>
            We may disclose your personal information to third-party service
            providers who perform services on our behalf, such as website
            hosting, data analysis, and customer support. We may also disclose
            your personal information to comply with our legal obligations,
            enforce our Terms of Use, or protect our rights, property, or safety
            or the rights, property, or safety of others.
          </p>
          <h2 className="text-xl font-bold">Cookies</h2>
          <p>
            We may use cookies to collect information about your use of
            Grubby.ai. Cookies are small files that are stored on your device
            when you visit Grubby.ai. We may use cookies to personalize your
            experience on Grubby.ai, analyze your use of Grubby.ai, and improve
            Grubby.ai and its services. You may refuse to accept cookies by
            adjusting your browser settings, but doing so may affect your
            ability to use Grubby.ai and its services.
          </p>
          <h2 className="text-xl font-bold">Third-Party Links</h2>
          <p>
            Grubby.ai may contain links to third-party websites or services that
            are not owned or controlled by us. We are not responsible for the
            privacy practices or content of these third-party websites or
            services. We encourage you to read the privacy policies of these
            third-party websites or services before providing any personal
            information.
          </p>
          <h2 className="text-xl font-bold">Security</h2>
          <p>
            We take reasonable measures to protect your personal information
            from unauthorized access, use, or disclosure. However, no security
            measure is perfect or impenetrable, and we cannot guarantee the
            security of your personal information.
          </p>
          <h2 className="text-xl font-bold">Changes to Privacy Policy</h2>
          <p>
            We reserve the right to modify or update this privacy policy at any
            time without prior notice. Your continued use of Grubby.ai after
            such modifications shall constitute your acceptance of the modified
            privacy policy.
          </p>
          <h2 className="text-xl font-bold">Contact Us</h2>
          <p>
            If you have any questions about these privacy policy or our website,
            please contact us at
            <a rel="nofollow" href="mailto:contact@grubby.ai">
              contact@grubby.ai.
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
