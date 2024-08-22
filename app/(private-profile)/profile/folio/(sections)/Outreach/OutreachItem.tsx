import { BsTelephone, BsEnvelopeAt, BsLightbulb } from "react-icons/bs";

const Email = ({emailSubject, emailBody}) => {
  return (
    <div className="mockup-window border-base-900 border">
      <div className="border-base-900 border-t px-4 py-4 flex flex-col">
        <label className="text-sm text-base-600 -ms-2">
            Subject:
        </label>
        <h2 className="font-bold text-2xl mb-6">
            {emailSubject}
        </h2>
        <label className="text-sm text-base-600 -ms-2">
            Body:
        </label>
        <p className="text-lg whitespace-pre">
            {emailBody}
        </p>
      </div>
    </div>
  );
}
const Call = ({audioFileUrl}) => {
  return (
    <div className="mockup-window border-base-900 border">
      <div className="border-base-900 border-t px-4 py-4 flex flex-col">
        <h2 className="font-bold text-2xl">
            {audioFileUrl}
        </h2>
      </div>
    </div>
  );
}
const Creative = ({imageUrl}) => {
  return (
    <div className="mockup-window border-base-900 border">
      <div className="border-base-900 border-t px-4 py-4 flex flex-col">
        <h2 className="font-bold text-2xl">
            {imageUrl}
        </h2>
      </div>
    </div>
  );
}

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
  const OutreachDisplay = outreachTypes[outreach.type].component;
  const Icon = outreachTypes[outreach.type].icon;
  return (
    <div className="w-full max-w-4xl">
      <h1 className="text-4xl font-semibold flex gap-2">
        <Icon /> {outreach.title}
      </h1>
      <span className="italic text-sm text-base-600">
        Created: {outreach.createdAt.slice(0,10)}
        </span>
      <p className="text-lg font-light my-2 whitespace-pre">
        {outreach.description}
      </p>
      <OutreachDisplay {...outreach} />
    </div>
  );
}
