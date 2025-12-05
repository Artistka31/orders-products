import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";

const tabsContent = {
  Приход: <div>Содержимое Приход</div>,
  Группы: <div>Содержимое Группы</div>,
  Продукты: <div>Содержимое Продукты</div>,
  Пользователи: <div>Содержимое Пользователи</div>,
  Настройки: <div>Содержимое Настройки</div>,
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("Приход");

  return (
    <div className="flex flex-col h-screen">
      <div className="">
        <Header />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="flex-1 p-4 relative">
          <TransitionGroup component={null}>
            <CSSTransition
              key={activeTab}
              timeout={300}
              classNames="animate__animated animate__fadeIn"
              unmountOnExit
            >
              <div>{tabsContent[activeTab]}</div>
            </CSSTransition>
          </TransitionGroup>
        </div>
      </div>
    </div>
  );
}
