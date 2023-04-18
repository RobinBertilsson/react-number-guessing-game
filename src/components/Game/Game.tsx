import { generateRandomNumberSerie } from "../../utils/generateRandomNumberSerie"
import useWindowSize from 'react-use/lib/useWindowSize'
import { useEffect, useMemo, useState } from "react"
import Confetti from 'react-confetti'

interface GuessResult {
  correctPositions: number
  correctNumbers: number
  input: string
}

function guess(input: string, answer: number[]): GuessResult {
  const numArr = input.split('').map(n => Number(n))

  const correctNumbers = answer
    .filter(a => numArr.includes(a))
    .length

  let correctPositions = 0

  for (let i in [1, 2, 3, 4]) {
    if (numArr[i] === answer[i]) {
      correctPositions++
    }
  }

  return {
    correctPositions,
    correctNumbers,
    input,
  }
}

export function Game() {
  const [guesses, setGuesses] = useState<GuessResult[]>([])
  const [input, setInput] = useState<string>('')
  const { width, height } = useWindowSize()

  const isWin = useMemo(() => {
    return !!guesses.find(g => g.correctNumbers === 4 && g.correctPositions === 4)
  }, [guesses])

  const answer = useMemo(() => {
    return generateRandomNumberSerie()
  }, [])

  useEffect(() => {
    if (input.length < 4) {
      return
    }

    setGuesses(prev => [...prev, guess(input, answer)])
    setInput('')
  }, [input, answer])

  return (
    <>
      {!isWin ? (
        <>
          <div className="relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32 mb-12">
            <h1 className="text-white font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center">
              Guess the 4-digit number
            </h1>
          </div>

          <div className="flex items-center justify-center gap-6 max-w-sm mx-auto mb-12">
            <input
              className="bg-slate-500 focus:outline-none p-4 text-slate-900 font-semibold text-3xl w-full appearance-none text-center"
              onChange={({ target }) => setInput(target.value)}
              autoFocus={true}
              value={input}
              type="number"
            />
          </div>

          <div className="max-w-lg mx-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">#</th>
                  <th className="text-left">Guess</th>
                  <th className="text-left">Correct numbers</th>
                  <th className="text-left">Correct positions</th>
                </tr>
              </thead>
              <tbody>
                {guesses.map((g, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{g.input}</td>
                    <td>{g.correctNumbers}</td>
                    <td>{g.correctPositions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          <div className="relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32 mb-12">
            <h1 className="text-white font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center">
              You made it in {guesses.length} {guesses.length > 1 ? 'guesses' : 'guess'}!
            </h1>
          </div>

          <Confetti
            width={width}
            height={height}
          />
        </>
      )}
    </>
  )
}
