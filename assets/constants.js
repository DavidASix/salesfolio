const c = module.exports;

c.siteName = "SalesFolio";
c.titlePrefix = 'SalesFolio';
c.url = "mysalesfolio.com";

c.cms = 'https://api.mysalesfolio.com'

c.domain = process.env.NODE_ENV === "production"
  ? "https://mysalesfolio-com.vercel.app"
  : "http://localhost:3000";

c.plausible_domain = process.env.NODE_ENV === "production"
? "mysalesfolio.com"
: "na";

c.google_tag = process.env.NODE_ENV === "production"
? "G-"
: "na";
