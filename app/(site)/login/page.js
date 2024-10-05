import { signIn, signOut, auth } from "@/auth";
import { redirect } from "next/navigation";

//import LoginGraphic from "@/public/login.svg";

async function loginLinkedin() {
  "use server";
  await signIn("linkedin", { redirectTo: "/profile" });
}

async function loginGoogle() {
  "use server";
  await signIn("google", { redirectTo: "/profile" });
}

async function loginResend(formData) {
  "use server";
  await signIn("resend", formData);
}

async function logout() {
  "use server";
  await signOut();
}

export default async function Login() {
  const session = await auth();
  /*
  if (session?.user) {
    return redirect("/profile");
  }
  */
  return (
    <>
      <div className="flex h-screen">
        <div className="hidden lg:flex items-center justify-center flex-1 bg-base-50">
          <div className="max-w-xl text-center">
            <img src="/login.svg" className="h-screen w-screen " />
          </div>
        </div>
        <div className="w-full bg-transparent lg:w-1/2 flex items-center justify-center">
          <div className="max-w-md w-full p-6 flex flex-col items-center">
            <h1 className="text-5xl header-font mb-6 text-center">Sign Up</h1>
            <h2 className="text-md font-semibold mb-6 text-base-700 text-center">
              Login to set up your SalesFolio today
            </h2>
            <div className="w-full lg:w-80 gap-4 flex flex-col items-center justify-between">
              <form className="w-full" action={loginLinkedin}>
                <button type="submit" className="w-full btn btn-neutral">
                  <svg
                    className="w-7"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                  >
                    <path
                      fill="#0A66C2"
                      d="M12.225 12.225h-1.778V9.44c0-.664-.012-1.519-.925-1.519-.926 0-1.068.724-1.068 1.47v2.834H6.676V6.498h1.707v.783h.024c.348-.594.996-.95 1.684-.925 1.802 0 2.135 1.185 2.135 2.728l-.001 3.14zM4.67 5.715a1.037 1.037 0 01-1.032-1.031c0-.566.466-1.032 1.032-1.032.566 0 1.031.466 1.032 1.032 0 .566-.466 1.032-1.032 1.032zm.889 6.51h-1.78V6.498h1.78v5.727zM13.11 2H2.885A.88.88 0 002 2.866v10.268a.88.88 0 00.885.866h10.226a.882.882 0 00.889-.866V2.865a.88.88 0 00-.889-.864z"
                    />
                  </svg>{" "}
                  Login with Linkedin{" "}
                </button>
              </form>
              <form className="w-full" action={loginGoogle}>
                <button type="submit" className="w-full btn btn-neutral">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-5"
                    id="google"
                  >
                    <path
                      fill="#fbbb00"
                      d="M113.47 309.408 95.648 375.94l-65.139 1.378C11.042 341.211 0 299.9 0 256c0-42.451 10.324-82.483 28.624-117.732h.014L86.63 148.9l25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456.002 18.792 3.406 36.797 9.651 53.408z"
                    ></path>
                    <path
                      fill="#518ef8"
                      d="M507.527 208.176C510.467 223.662 512 239.655 512 256c0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.925-90.134 146.187l-.014-.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89V208.176h245.899z"
                    ></path>
                    <path
                      fill="#28b446"
                      d="m416.253 455.624.014.014C372.396 490.901 316.666 512 256 512c-97.491 0-182.252-54.491-225.491-134.681l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z"
                    ></path>
                    <path
                      fill="#f14336"
                      d="m419.404 58.936-82.933 67.896C313.136 112.246 285.552 103.82 256 103.82c-66.729 0-123.429 42.957-143.965 102.724l-83.397-68.276h-.014C71.23 56.123 157.06 0 256 0c62.115 0 119.068 22.126 163.404 58.936z"
                    ></path>
                  </svg>{" "}
                  Login with Google{" "}
                </button>
              </form>
            </div>
            <span>or</span>
            <form action={loginResend} className="w-full flex flex-col">
              <input
                type="text"
                name="email"
                placeholder="Email"
                className="input input-primary"
              />
              <button type="submit" className="w-full btn btn-neutral">
                Log in with Resend
              </button>
            </form>

            <form action={logout} className="w-full flex flex-col">
              <button type="submit" className="w-full btn btn-warning">
                Logout
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
