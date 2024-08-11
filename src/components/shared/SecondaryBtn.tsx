import React from 'react'

type BtnType = "submit" | "reset" | "button";

export default function SecondaryBtn({ type, text, action, xtraStyling }: { type: BtnType, text: string, action: () => any, xtraStyling?: string}) {
  return (
    <button
    onClick={action}
    className={` ${xtraStyling}`}
    type={type}>
      {text}
    </button>
  )
}
