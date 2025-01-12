const MAX_STATS = 45; // 15 (Attack) + 15 (Defense) + 15 (HP)

export function getAverageIVFromHexStats(hexStat: string): number {
  const attackStat = Number(`0x${hexStat[0]}`);
  const defenseStat = Number(`0x${hexStat[1]}`);
  const hpStat = Number(`0x${hexStat[2]}`);
  return getAverageIVFromStats(attackStat, defenseStat, hpStat);
}

export function getAverageIVFromStats(attackStat: number, defenseStat: number, hpStat: number): number {
  const totalStats = attackStat + defenseStat + hpStat;
  const decimalIV = (totalStats / MAX_STATS) * 100;
  return Math.round(decimalIV);
}