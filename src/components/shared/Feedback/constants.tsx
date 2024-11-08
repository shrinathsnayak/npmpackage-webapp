import {
  IconMoodSmileDizzy,
  IconMoodSmile,
  IconMoodCry,
  IconMoodSad,
  IconMoodEmpty,
} from "@tabler/icons-react";

const STROKE_VALUE = "1.5";

export const SCORE_VALUES: any = [
  { value: 5, label: <IconMoodSmileDizzy stroke={STROKE_VALUE} /> },
  { value: 4, label: <IconMoodSmile stroke={STROKE_VALUE} /> },
  { value: 3, label: <IconMoodEmpty stroke={STROKE_VALUE} /> },
  { value: 2, label: <IconMoodSad stroke={STROKE_VALUE} /> },
  { value: 1, label: <IconMoodCry stroke={STROKE_VALUE} /> },
];
