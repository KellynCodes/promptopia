"use client";

import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 py-3">
      <Link href={"/"} className="flex gap-2 flex-center ">
        <Image
          width={30}
          height={30}
          className={"object-contain"}
          src={"/assets/images/logo.svg"}
          alt=""
        />
        <p className={"logo_text"}>Promptopia</p>
      </Link>

      <div className="sm:flex hidden">
        {session?.user ? (
          <div className={"flex gap-3 md:gap-5"}>
            <Link className={"black_btn"} href={"/create-prompt"}>
              Create Prompt
            </Link>
            <button type="button" onClick={signOut} className={"outline_btn"}>
              Sign Out
            </button>
            <Link href={"/profile"}>
              <Image
                src={
                  session?.user.image
                }
                alt="profile"
                className={"rounded-full"}
                width={37}
                height={37}
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className={"black_btn"}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={
                session?.user.image
              }
              alt="profile"
              className={"rounded-full"}
              width={37}
              height={37}
              onClick={() => setToggleDropdown((prevState) => !prevState)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href={"/profile"}
                  className={"dropdown_link"}
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href={"/create-prompt"}
                  className={"dropdown_link"}
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>

                <button
                  className={"mt-5 w-full black_btn"}
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className={"black_btn"}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
