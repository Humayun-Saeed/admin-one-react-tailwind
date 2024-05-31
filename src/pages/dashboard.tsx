import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartPie,
  mdiChartTimelineVariant,
  mdiGithub,
  mdiMonitorCellphone,
  mdiReload,
  mdiFood,
} from '@mdi/js'
import Head from 'next/head'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import type { ReactElement } from 'react'
import Button from '../components/Button'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/Section/Main'
import SectionTitleLineWithButton from '../components/Section/TitleLineWithButton'
import CardBoxWidget from '../components/CardBox/Widget'
import { useSampleClients, useSampleTransactions } from '../hooks/sampleData'
import CardBoxTransaction from '../components/CardBox/Transaction'
import { Client, Transaction } from '../interfaces'
import CardBoxClient from '../components/CardBox/Client'
import SectionBannerStarOnGitHub from '../components/Section/Banner/StarOnGitHub'
import CardBox from '../components/CardBox'
import { sampleChartData } from '../components/ChartLineSample/config'
import ChartLineSample from '../components/ChartLineSample'
import NotificationBar from '../components/NotificationBar'
import TableSampleClients from '../components/Table/SampleClients'
import { getPageTitle } from '../config'
import { BiDish } from 'react-icons/bi'
import UserJoinChart from '../components/UserJoinChart/UserJoinChart'
import useAxios from '../hooks/useAxios'

const DashboardPage = () => {
  const { clients } = useSampleClients()
  const { transactions } = useSampleTransactions()

  const clientsListed = clients.slice(0, 4)

  const [chartData, setChartData] = useState(sampleChartData())

  const fillChartData = (e: React.MouseEvent) => {
    e.preventDefault()

    setChartData(sampleChartData())
  }

  console.log('Chart ', chartData)
  const userData = [
    { date: '2023-05-01', count: 5 },
    { date: '2023-05-02', count: 8 },
    { date: '2023-05-03', count: 3 },
    { date: '2023-05-04', count: 12 },
    { date: '2023-05-05', count: 7 },
    { date: '2023-05-06', count: 15 },
  ]

  const { data, error, loading, sendRequest } = useAxios()
  const { data:DishData,  sendRequest:SendDishRequest } = useAxios()

  useLayoutEffect(() => {
    SendDishRequest('Dish/all')
  }, [])

  useEffect(() => {
    let method
    sendRequest('user/joinDates')
  }, [])

  useEffect(() => {
    if (data) {
      console.log('DATAaa', data)
    }
  }, [data])

  useEffect(() => {
    console.log('Error', error)
  }, [error])

  console.log("Dishaaaa",DishData?.result?.length);
  

  return (
    <>
      <Head>
        <title>{getPageTitle('Dashboard')}</title>
      </Head>
      <SectionMain>
        <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
          <CardBoxWidget
            trendLabel="12%"
            trendType="up"
            trendColor="success"
            icon={mdiAccountMultiple}
            iconColor="success"
            number={512}
            label="Clients"
          />
          <CardBoxWidget
            trendLabel="16%"
            trendType="up"
            trendColor="danger"
            icon={mdiFood}
            iconColor="info"
            number={DishData?.result?.length}
            label="Dishes"
          />
          <CardBoxWidget
            trendLabel="Overflow"
            trendType="warning"
            trendColor="warning"
            icon={mdiChartTimelineVariant}
            iconColor="danger"
            number={256}
            numberSuffix="%"
            label="Performance"
          />
        </div>

        <UserJoinChart data={data?.result} />
      </SectionMain>
    </>
  )
}

DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default DashboardPage
