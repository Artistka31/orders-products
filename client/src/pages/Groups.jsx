import React, { useRef } from "react";
import { useStore } from "../store/useStore";
import GroupCard from "../components/GroupCard";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../animations/slide.css";

export default function Groups() {
  const groups = useStore((s) => s.groups);

  const nodeRefs = useRef([]);
  nodeRefs.current = groups.map(
    (_, i) => nodeRefs.current[i] || React.createRef()
  );

  return (
    <div className="w-full px-4 sm:px-10 md:px-14 mt-20 sm:mt-28">
      <h2 className="text-neutral-800 font-medium text-lg sm:text-xl leading-none mb-6 lg:mb-12 text-center sm:text-left">
        Приходы / {groups.length}
      </h2>

      <TransitionGroup
        component="div"
        className="flex flex-col items-center sm:items-start gap-3 w-full"
      >
        {groups.map((group, i) => (
          <CSSTransition
            key={group.id}
            timeout={600 + i * 150}
            classNames="slide"
            appear
            nodeRef={nodeRefs.current[i]}
          >
            <div
              ref={nodeRefs.current[i]}
              style={{ transitionDelay: `${i * 150}ms` }}
              className="w-full flex"
            >
              <GroupCard group={group} />
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}
