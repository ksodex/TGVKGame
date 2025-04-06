import "../style.css"

import React, { useState } from "react"

import { useRouterPanel } from "@kokateam/router-vkminiapps"
import { PanelHeader } from "@vkontakte/vkui"
import { Button } from "../components/Button"

import { itemsInfo } from "../vendor/gameInfo"

const MainPage = () => {
    const [_, toPanel] = useRouterPanel()
    const [activeCategory, setActiveCategory] = useState("Все")

    return <main className="bg-[#f1f3f5] space-y-4">
        <PanelHeader separator={true}>
            <span className="flex justify-center text-md text-[#FF4800]">Игры</span>
        </PanelHeader>

        <div className="ml-10">
            <Button onClick={() => toPanel("rating")}>Рейтинг (ЧИСТО ТЕСТ)</Button>
        </div>


        <section className="min-h-screen space-y-4 p-2">
            <div className="flex shrink-0 flex-nowrap space-x-2 overflow-x-auto w-full">
                {itemsInfo.categoryes.map((item, index) => (
                    <Button
                        onClick={() => setActiveCategory(item)}
                        className={`border ${activeCategory === item ? "border-[#430B51] bg-[#430B51] text-white" : "border-white bg-gray-300 text-[#430B51]"} font-semibold rounded-full whitespace-nowrap px-3 py-1`} key={index}
                    >
                        {item}
                    </Button>
                ))}
            </div>

            {itemsInfo.data.map((category, itemIndex) => (
                <div key={itemIndex}>
                    {
                        (activeCategory === "Все" || activeCategory === category.title) &&
                        <div>
                            {
                                activeCategory === "Все" &&
                                <h1 className="font-bold text-[#430B51]">{category.title}</h1>
                            }
                            {category.games.map((game, indexGame) => (
                                <div className="bg-white rounded-md space-y-3 text-sm p-2 m-2" key={indexGame}>
                                    <h1 className="font-bold text-[#FF4800]">{game.title}</h1>
                                    <p>{game.description}</p>
                                    <Button onClick={() => toPanel(game.code)}>Играть</Button>
                                </div>
                            ))}
                        </div>
                    }
                </div>
            ))}
        </section>
    </main>
}

export default MainPage