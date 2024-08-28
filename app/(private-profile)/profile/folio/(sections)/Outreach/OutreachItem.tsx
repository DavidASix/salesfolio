import { BsTelephone, BsEnvelopeAt, BsLightbulb } from "react-icons/bs";
import { BsPen } from "react-icons/bs";

import AudioPlayer from "./AudioPlayer";

const Email = ({ emailSubject, emailBody }) => {
  return (
    <div className="flex flex-col py-4 border-b-2 border-accent mb-4">
      <label className="text-sm text-base-600">Subject:</label>
      <h2 className="font-bold text-lg px-2 mb-2">{emailSubject}</h2>
      <label className="text-sm text-base-600">Body:</label>
      <p className="text-md font-normal whitespace-pre-wrap px-2">
        {emailBody}
      </p>
    </div>
  );
};
const Call = ({ audioFileUrl }) => {
  return <AudioPlayer url={audioFileUrl} />;
};
const Creative = ({ imageUrl }) => {
  return (
    <div className="flex flex-col py-4 border-b-2 border-accent mb-4 content-center items-center">
      <img
        src={imageUrl}
        className="w-auto h-auto object-contain max-h-[440px] rounded-2xl border border-base-900"
      />
    </div>
  );
};

const outreachTypes = {
  call: {
    slug: "call",
    title: "Cold Call",
    icon: BsTelephone,
    component: Call,
  },
  email: {
    slug: "email",
    title: "Email",
    icon: BsEnvelopeAt,
    component: Email,
  },
  creative: {
    slug: "creative",
    title: "Creative",
    icon: BsLightbulb,
    component: Creative,
  },
};

export default function OutreachItem({ outreach }) {
  const { slug, title, icon, component } = outreachTypes[outreach.type];
  const OutreachDisplay = component;
  const Icon = icon;
  return (
    <article className="flex flex-col w-full border border-base-300 rounded-3xl bg-white overflow-hidden pb-4">
      <header className="flex justify-between border-b border-base-300 py-3 px-4 bg-accent-50">
        <Icon className="h-6 w-6 fill-accent-500" />
        <span className="text-md font-light text-base-900">
          {outreach.createdAt.slice(0, 10)}
        </span>
        <BsPen className="h-6 w-6 fill-accent-500 " />
      </header>
      <div className="px-4">
        <OutreachDisplay {...outreach} />
        <p className="text-sm font-light whitespace-pre-wrap">
          {outreach.description}
        </p>
      </div>
    </article>
  );
}
