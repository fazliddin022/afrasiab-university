import math from './math'
import physics from './physics'
import english from './english'
import type { Subject } from '../../context/TestContext'

export const questionsBySubject: Record<Subject, typeof math> = {
  math,
  physics,
  english,
}