import React, { useState } from "react";
import "./Categories.module.sass";

const Banner = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen((prevState) => !prevState);
    };

    return (
        <nav className="bg-black mx-3 md:mx-24 rounded">
            <div className="md:hidden">
                <button
                    className="block w-full bg-black text-white text-left border-b-2 border-transparent uppercase text-sm px-3 py-2 hover:text-sky-700"
                    onClick={toggleDropdown}
                >
                    Menu
                </button>
                {isDropdownOpen && (
                    <div className="mt-2">
                        <a
                            className="block no-underline text-white border-b-2 border-transparent uppercase text-sm px-3 py-2 hover:text-sky-700"
                            href="/Ordinateurs"
                        >
                            Ordinateurs
                        </a>
                        <a
                            className="block no-underline text-white border-b-2 border-transparent uppercase text-sm px-3 py-2 hover:text-sky-700"
                            href="/accessoires"
                        >
                            Accessoires
                        </a>
                        <a
                            className="block no-underline text-white border-b-2 border-transparent uppercase text-sm px-3 py-2 hover:text-sky-700"
                            href="/Carte Graphique"
                        >
                            Carte Graphique
                        </a>
                        <a
                            className="block no-underline text-white border-b-2 border-transparent uppercase text-sm px-3 py-2 hover:text-sky-700"
                            href="/Promotions"
                        >
                            Promotions
                        </a>
                    </div>
                )}
            </div>
            <div className="hidden md:flex flex-wrap md:flex-nowrap justify-evenly items-center">
                {/* Desktop Links (visible on tablets and larger screens) */}
                    <a
                        className="my-btn no-underline text-white border-b-2 border-transparent uppercase text-xs md:text-sm px-3 py-2 hover:text-sky-700"
                        href="/Ordinateurs"
                    >
                        Ordinateurs
                    </a>
                
                
                <a
                    className="relative inline-block no-underline text-white border-b-2 border-transparent uppercase text-xs md:text-sm px-3 py-2 hover:text-sky-700"
                    href="/accessoires"
                >
                    Accessoires
                </a>
                <a
                    className="relative inline-block no-underline text-white border-b-2 border-transparent uppercase text-xs md:text-sm px-3 py-2 hover:text-sky-700"
                    href="/Carte Graphique"
                >
                    Carte Graphique
                </a>
                <a
                    className="relative inline-block no-underline text-white border-b-2 border-transparent uppercase text-xs md:text-sm px-3 py-2 hover:text-sky-700"
                    href="/Promotions"
                >
                    Promotions
                </a>
            </div>
        </nav>
    );
};

export default Banner;
