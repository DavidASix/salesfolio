import { BsTelephone, BsEnvelopeAt, BsLightbulb } from "react-icons/bs";
import {
  BsPen,
} from "react-icons/bs";

import AudioPlayer from "./AudioPlayer";

const Email = ({ emailSubject, emailBody }) => {
  return (
    <div className="mockup-window border-base-900 border">
      <div className="border-base-900 border-t px-4 py-4 flex flex-col">
        <label className="text-sm text-base-600 -ms-2">Subject:</label>
        <h2 className="font-bold text-2xl mb-6">{emailSubject}</h2>
        <label className="text-sm text-base-600 -ms-2">Body:</label>
        <p className="text-lg whitespace-pre">{emailBody}</p>
      </div>
    </div>
  );
};
const Call = ({ audioFileUrl }) => {
  return <AudioPlayer url={audioFileUrl} />;
};
const Creative = ({ imageUrl }) => {
  return (
    <div className="mockup-window border-base-900 border">
      <div className="border-base-900 border-t px-4 py-4 flex flex-col">
        <h2 className="font-bold text-2xl">{imageUrl}</h2>
      </div>
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
    <article className="flex flex-col w-full border border-base p-4 rounded-3xl shadow">
      <header className="flex justify-between">
          <Icon className="h-6 w-6 fill-accent-500" />
        <span className="text-sm font-extralight text-base-900">
          {outreach.createdAt.slice(0, 10)}
        </span>
        <BsPen className="h-6 w-6 fill-accent-500 " />
      </header>
      <OutreachDisplay {...outreach} />
      <div>
        <p className="text-md font-light whitespace-pre-wrap">
          {outreach.description}
        </p>
      </div>
    </article>
  );
}
