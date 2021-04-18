// @ts-ignore
import theme from './_theme.scss';

export const colors: { [name: string]: string } = (theme as string)
  .split('\n')
  .map(l => l.match(/\$color-(.+):\s+(.+);/))
  .filter(Boolean)
  .reduce(
    (acc, cur) => ((acc[cur![1]] = cur![2]), acc),
    {} as {
      [name: string]: string;
    }
  );
