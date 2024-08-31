'use client'
import React, { useState, useEffect } from 'react';
import { Wheel } from 'react-custom-roulette';
import Link from 'next/link';

const Roulette = ({ data }: any) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [rouletteData, setRouletteData] = useState(data);

  const handleSpinClick = () => {
    if (!mustSpin && rouletteData) {
      const newPrizeNumber = Math.floor(Math.random() * rouletteData.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  useEffect(() => {
    const addShortString = data.map((item: { name: string; id: number }) => {
      return {
        completeOption: item.name,
        option: item.name,
        id: item.id,
      };
    });
    setRouletteData(addShortString);
  }, [data]);

  // useEffect(() => {
  //   if (mustSpin) {
  //     console.log('Spinning started!');
  //     //  Можно добавить любую логику, которая должна выполняться после начала кручения
  //   }
  // }, [mustSpin]);

  return (
    <div>
      <Wheel
        mustStartSpinning={mustSpin}
        spinDuration={0.2}
        prizeNumber={prizeNumber}
        data={rouletteData}
        outerBorderColor='#ccc'
        outerBorderWidth={9}
        innerBorderColor='#f2f2f2'
        radiusLineColor='transparent'
        radiusLineWidth={1}
        textDistance={55}
        fontSize={10}
        backgroundColors={[
          '#3f297e',
          '#175fa9',
          '#169ed8',
          '#239b63',
          '#64b031',
          '#efe61f',
          '#f7a416',
          '#e6471d',
          '#dc0936',
          '#e5177b',
          '#be1180',
          '#871f7f',
        ]}
        onStopSpinning={() => {
          setMustSpin(false);
        }}
      />

      <button
        className='block rounded-2xl border border-[#DDF6F2] border-opacity-25 p-1 px-5 py-2 text-center transition hover:bg-slate-500'
        onClick={handleSpinClick}
        disabled={mustSpin}
      >
        {!mustSpin ? 'Twist' : 'Spinning...'}
      </button>
      {!mustSpin && rouletteData && (
        <Link
          href={{ pathname: '/searchResults', query: { search: rouletteData[prizeNumber]?.id } }}
          className='mt-2 block max-w-36 rounded-2xl border border-[#DDF6F2] border-opacity-25 p-1 px-5 py-2 text-center transition hover:bg-slate-500'
        >
          {rouletteData[prizeNumber]?.completeOption}
        </Link>
      )}
    </div>
  );
};

export default Roulette;
