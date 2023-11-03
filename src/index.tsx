import * as React from 'react'
import styles from './styles.module.css'

interface Props {
  text: string
}

export const ExampleComponent = ({ text }: Props) => {
  return <div className={styles.test}>Example Component: {text}</div>
}

export const ButtonNih=()=>{
  return (
    <div>
      <button>sdasd</button>
    </div>
  )
}