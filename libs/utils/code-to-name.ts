export function codeToName(code: string) {
  const codeLetter = code.charAt(0);
  switch (codeLetter) {
    case 'T':
      return 'Teacher';
    case 'A':
      return 'Admin';
    case 'S':
      return 'Student';
    case 'E':
      return 'Expert';
    case 'P':
      return 'Parent';
  }
}
