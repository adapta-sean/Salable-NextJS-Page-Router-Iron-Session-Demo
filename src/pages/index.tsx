import { Inter } from "next/font/google";
import {useEffect, useState} from "react";
import {useUser} from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const [session, setSession] = useState<{capabilities: string[]} | null>(null);
  const {isSignedIn} = useUser();

  useEffect(() => {
    if (!isSignedIn) {
        setSession(null)
        return;
    }
    fetch("/api/session")
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if(data.capabilities) {
            setSession({capabilities: data.capabilities})
          } else {
            setSession(null)
          }
        })
        .catch(e => console.error(e));
  }, [isSignedIn]);

  return (
    <main
      className={`flex min-h-screen flex-col py-6 px-24 ${inter.className}`}
    >
      <h1>Salable NextJS Page Router + Iron Session Demo</h1>
      {session ? (
          <>
            <h2>Capabilities</h2>
            <ul>
              {session.capabilities.map(capability => <li>{capability}</li>)}
            </ul>
          </>
      ) : null}
    </main>
  );
}
