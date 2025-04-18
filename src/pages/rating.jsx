import axios from "axios"

import { useRouterPanel, useRouterBack } from "@kokateam/router-vkminiapps"
import { PanelHeader } from "@vkontakte/vkui"
import { useEffect, useState } from "react"

const RatingPage = () => {
    const [users, setUsers] = useState([])
    const [nowUser, setNowUser] = useState()
    const [isPrizesOpen, setIsPrizesOpen] = useState(false)

    const [panel, toPanel] = useRouterPanel()
    const toBack = useRouterBack()

    useEffect(() => {
        const fetcher = async () => {
            try {
                const response = await axios.get("/rating")
                const { data } = response.data
                return data
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        }

        fetcher().then(data => {
            setUsers(data.users)
            setNowUser(data.users[data.userIndex])
        })
    }, [])

    return (
        <main className="bg-[#f1f3f5] min-h-screen space-y-4">
            <PanelHeader
                before={
                    <button className="ml-5" onClick={() => toBack(-1)}>
                        <svg
                            width="18"
                            height="16"
                            viewBox="0 0 18 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M7.29289 0.292893C7.68342 -0.0976311 8.31658 -0.0976311 8.70711 0.292893C9.09763 0.683418 9.09763 1.31658 8.70711 1.70711L3.414 7H17C17.5128 7 17.9355 7.38604 17.9933 7.88338L18 8C18 8.55228 17.5523 9 17 9H3.414L8.70711 14.2929C9.06759 14.6534 9.09532 15.2206 8.7903 15.6129L8.70711 15.7071C8.31658 16.0976 7.68342 16.0976 7.29289 15.7071L0.292893 8.70711L0.219689 8.62545C0.217372 8.62256 0.215071 8.61966 0.212786 8.61675C0.207285 8.60984 0.201753 8.6026 0.196334 8.59531C0.17849 8.57113 0.161719 8.54628 0.146068 8.52066C0.138607 8.50861 0.131499 8.49639 0.124671 8.48406C0.113794 8.46429 0.103377 8.44389 0.0936537 8.4231C0.0856789 8.4061 0.0781966 8.3888 0.0712256 8.37134C0.0633159 8.35158 0.0561225 8.3318 0.0495467 8.31174C0.0447288 8.29685 0.0400979 8.28146 0.0358453 8.26599C0.0298338 8.24444 0.0246396 8.22275 0.020165 8.20079C0.016702 8.18338 0.0136281 8.16595 0.0110178 8.14847C0.00376119 8.10036 0 8.05062 0 8L0.00396633 8.08925C0.0018949 8.066 0.000634706 8.04268 0.000185966 8.01935L0 8C0 7.99359 6.03044e-05 7.9872 0.000180244 7.98082C0.000599384 7.95798 0.00186552 7.93433 0.00396633 7.91075C0.00576604 7.89015 0.00811212 7.8705 0.0110192 7.85104C0.013628 7.83405 0.0167024 7.81663 0.0202403 7.79927C0.02464 7.77725 0.0298335 7.75556 0.0357208 7.73416C0.0400976 7.71854 0.0447286 7.70315 0.0497379 7.68786C0.0561223 7.6682 0.0633158 7.64842 0.071104 7.62894C0.0781965 7.61121 0.0856789 7.5939 0.0936732 7.57678C0.103377 7.55611 0.113794 7.53571 0.124876 7.51572C0.131499 7.50361 0.138607 7.49139 0.145996 7.47929C0.161719 7.45373 0.17849 7.42887 0.196313 7.40484C0.225313 7.36567 0.257499 7.32829 0.292893 7.29289L0.212786 7.38325C0.237669 7.35153 0.264427 7.32136 0.292893 7.29289L7.29289 0.292893Z"
                                fill="#FF4800"
                            />
                        </svg>
                    </button>
                }
                separator={true}
            >
                <span className="flex justify-center text-md text-[#FF4800]">Рейтинг</span>
            </PanelHeader>

            <section className="space-y-4 text-[#430B51] p-2 m-2">
                <div
                    className={`rounded-md bg-gradient-to-r from-[#FF4800] to-[#FF7742] p-2 transition-all duration-300 ${isPrizesOpen ? "max-h-96" : "max-h-12"
                        } overflow-hidden`}
                    onClick={() => setIsPrizesOpen(!isPrizesOpen)}
                >
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-semibold text-white">Призы за места</h1>
                        <svg
                            width="20"
                            height="10"
                            viewBox="0 0 20 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`transition-transform duration-300 ${isPrizesOpen ? "rotate-180" : ""
                                }`}
                        >
                            <path
                                d="M1.3208 0.611206L10.2048 8.97259L19.0887 0.611208"
                                stroke="white"
                                strokeWidth="1.17378"
                            />
                        </svg>
                    </div>

                    {isPrizesOpen && (
                        <div className="mt-4 text-white space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <span className="text-2xl">🥇</span>
                                    <p className="font-semibold">1 место</p>
                                </div>
                                <span className="font-semibold">Скидка 50% на любой курс центра</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <span className="text-2xl">🥈</span>
                                    <p className="font-semibold">2 место</p>
                                </div>
                                <span className="font-semibold">Скидка 30% на любой курс центра</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <span className="text-2xl">🥉</span>
                                    <p className="font-semibold">3 место</p>
                                </div>
                                <span className="font-semibold">Скидка 15% на любой курс центра</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <p>
                                    <span className="font-semibold">4 – 15 место </span> получают поощрительные призы для активных участников. Что бы получить его напишите менеджеру
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-4 mb-20">
                    {users.map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                                <div
                                    style={{
                                        backgroundImage: `url(${item.photo_url})`,
                                        backgroundSize: "cover",
                                    }}
                                    className="flex items-center justify-center aspect-square rounded-full w-10 h-10"
                                >
                                    <div className="flex items-center justify-center relative left-3 top-3 bg-white shadow-black shadow-xl aspect-square rounded-full text-[12px] font-bold w-4 h-4">
                                        {index + 1}
                                    </div>
                                </div>
                                <span>{item.name}</span>
                            </div>

                            <div className="flex items-center space-x-1">
                                <svg
                                    width="12"
                                    height="18"
                                    viewBox="0 0 12 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M8.75325 3.45399L7.94046 6.75435L9.86374 7.10488C10.818 7.26594 11.6788 7.72087 11.9325 8.63017C12.1889 9.54906 11.6832 10.4655 11.1122 11.1513L6.03158 16.8961C5.70319 17.2499 5.36954 17.5372 5.03987 17.7129C4.73616 17.8748 4.24309 18.0373 3.77143 17.7645C3.3105 17.4979 3.19323 16.999 3.16874 16.6563C3.14187 16.2802 3.20313 15.837 3.32468 15.355C3.3246 15.3553 3.32475 15.3547 3.32468 15.355L4.16056 12.0102L2.34907 11.6906C1.42971 11.5331 0.509595 11.1009 0.145904 10.2365C-0.238611 9.3225 0.159399 8.3415 0.949738 7.4784C1.41311 6.9724 1.9006 6.48835 2.3645 5.98254C3.20199 5.06937 4.42762 3.71747 6.04226 1.92582C6.35295 1.57587 6.67697 1.28928 7.00431 1.11191C7.31016 0.946181 7.79132 0.789781 8.25927 1.04144C8.72601 1.29245 8.8646 1.78046 8.89795 2.1358C8.93369 2.51669 8.87609 2.96528 8.75325 3.45399ZM7.37961 2.69627C7.31225 2.7609 7.23967 2.83634 7.1624 2.92346C5.94671 4.29411 4.70831 5.64617 3.46997 6.99641C3.17197 7.32133 2.69767 7.82277 2.05036 8.49759C1.42212 9.18619 1.4825 9.54537 1.52853 9.65478C1.68514 10.027 2.26231 10.1539 2.60612 10.2128L4.93815 10.6242C5.50039 10.7234 5.88773 11.2857 5.74406 11.8606L4.77932 15.7211C4.74247 15.8672 4.71541 15.9975 4.69665 16.1125C4.76753 16.0467 4.84416 15.9702 4.92623 15.8821L9.97345 10.1747C10.5036 9.53491 10.5237 9.16221 10.4877 9.03329C10.4664 8.957 10.3403 8.70562 9.6104 8.58334L7.15969 8.13676C6.59577 8.03399 6.22147 7.46159 6.35862 6.90471L7.29852 3.08825C7.33554 2.941 7.36196 2.81052 7.37961 2.69627Z"
                                        fill="#430B51"
                                    />
                                </svg>
                                <span>{item.exp || 0}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <div className="flex fixed bg-white justify-between gap-4 bottom-0 left-0 right-0 p-4 pb-8 shadow-black shadow-2xl">
                <div className="flex items-center space-x-2">
                    <div
                        style={{
                            backgroundImage: `url(${nowUser && nowUser.photo_url})`,
                            backgroundSize: "cover",
                        }}
                        className="flex items-center justify-center aspect-square rounded-full w-10 h-10"
                    >
                        {/* <div className="flex items-center justify-center relative left-3 top-3 bg-white shadow-black shadow-xl aspect-square rounded-full text-[12px] font-bold w-4 h-4">
                            {1}
                        </div> */}
                    </div>

                    <span>{nowUser && nowUser.name}</span>
                </div>

                <div className="flex gap-1 items-center">
                    <svg
                        width="12"
                        height="18"
                        viewBox="0 0 12 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8.75325 3.45399L7.94046 6.75435L9.86374 7.10488C10.818 7.26594 11.6788 7.72087 11.9325 8.63017C12.1889 9.54906 11.6832 10.4655 11.1122 11.1513L6.03158 16.8961C5.70319 17.2499 5.36954 17.5372 5.03987 17.7129C4.73616 17.8748 4.24309 18.0373 3.77143 17.7645C3.3105 17.4979 3.19323 16.999 3.16874 16.6563C3.14187 16.2802 3.20313 15.837 3.32468 15.355C3.3246 15.3553 3.32475 15.3547 3.32468 15.355L4.16056 12.0102L2.34907 11.6906C1.42971 11.5331 0.509595 11.1009 0.145904 10.2365C-0.238611 9.3225 0.159399 8.3415 0.949738 7.4784C1.41311 6.9724 1.9006 6.48835 2.3645 5.98254C3.20199 5.06937 4.42762 3.71747 6.04226 1.92582C6.35295 1.57587 6.67697 1.28928 7.00431 1.11191C7.31016 0.946181 7.79132 0.789781 8.25927 1.04144C8.72601 1.29245 8.8646 1.78046 8.89795 2.1358C8.93369 2.51669 8.87609 2.96528 8.75325 3.45399ZM7.37961 2.69627C7.31225 2.7609 7.23967 2.83634 7.1624 2.92346C5.94671 4.29411 4.70831 5.64617 3.46997 6.99641C3.17197 7.32133 2.69767 7.82277 2.05036 8.49759C1.42212 9.18619 1.4825 9.54537 1.52853 9.65478C1.68514 10.027 2.26231 10.1539 2.60612 10.2128L4.93815 10.6242C5.50039 10.7234 5.88773 11.2857 5.74406 11.8606L4.77932 15.7211C4.74247 15.8672 4.71541 15.9975 4.69665 16.1125C4.76753 16.0467 4.84416 15.9702 4.92623 15.8821L9.97345 10.1747C10.5036 9.53491 10.5237 9.16221 10.4877 9.03329C10.4664 8.957 10.3403 8.70562 9.6104 8.58334L7.15969 8.13676C6.59577 8.03399 6.22147 7.46159 6.35862 6.90471L7.29852 3.08825C7.33554 2.941 7.36196 2.81052 7.37961 2.69627Z"
                            fill="#430B51"
                        />
                    </svg>
                    <span>{nowUser && nowUser.exp}</span>
                </div>
            </div>
        </main>
    )
}

export default RatingPage