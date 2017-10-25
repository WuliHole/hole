/**
 * Virtual Key Codes, the value does not hold any inherent meaning.
 * Inspired somewhat from https://msdn.microsoft.com/en-us/library/windows/desktop/dd375731(v=vs.85).aspx
 * But these are "more general", as they should work across browsers & OS`s.
 */
export enum KeyMap {
  BackSpace = 8,
  Tab = 9,
  Enter = 13,
  Shift = 16,
  Ctrl = 17,
  Alt = 18,
  CapsLock = 20,
  Escape = 27,

  PageUp = 33,
  PageDown,
  End,
  Home,
  LeftArrow,
  UpArrow,
  RightArrow,
  DownArrow,
  Insert,
  Delete,
	/**
	 * Placed  to cover the 47 value of the enum.
	 */
  Unknown,
  KEY_0,
  KEY_1,
  KEY_2,
  KEY_3,
  KEY_4,
  KEY_5,
  KEY_6,
  KEY_7,
  KEY_8,
  KEY_9,
  // Key 	Code alphabet
  KEY_A = 65,
  KEY_B,
  KEY_C,
  KEY_D,
  KEY_E,
  KEY_F,
  KEY_G,
  KEY_H,
  KEY_I,
  KEY_J,
  KEY_K,
  KEY_L,
  KEY_M,
  KEY_N,
  KEY_O,
  KEY_P,
  KEY_Q,
  KEY_R,
  KEY_S,
  KEY_T,
  KEY_U,
  KEY_V,
  KEY_W,
  KEY_X,
  KEY_Y,
  KEY_Z,
  // left window key 	,
  // right window key 	,
  // select key 	,
  // numpad 0 ,
  // numpad 1 	,
  // numpad 2 	,
  // numpad 3 	,
  // numpad 4 	,
  // numpad 5 	,
  // numpad 6 	,
  // numpad 7 	,
  // numpad 8 	,
  // numpad 9 	,
  // multiply 	,
  // add 	,
  // subtract 	,
  // decimal point ,
  // divide 	,
  // f1 	,
  // f2 ,
  // f3 	,
  // f4 	,
  // f5 	,
  // f6 	,
  // f7 	,
  // f8 	,
  // f9 	,
  // f10 ,
  // f11 ,
  // f12

  // num lock =	144
  // scroll lock 	145
  // semi-colon 	186
  // equal sign 	187
  // comma 	188
  // dash 	189
  // period 	190
  // forward slash 	191
  // grave accent 	192
  // open bracket 	219
  // back slash 	220
  // close braket 	221
  // 'single-quote'= 222
}
