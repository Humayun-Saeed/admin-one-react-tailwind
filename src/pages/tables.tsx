import { mdiGithub, mdiMonitorCellphone, mdiTableBorder, mdiTableOff } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement, useEffect, useState } from 'react'
import Button from '../components/Button'
import CardBox from '../components/CardBox'
import CardBoxComponentEmpty from '../components/CardBox/Component/Empty'
import LayoutAuthenticated from '../layouts/Authenticated'
import NotificationBar from '../components/NotificationBar'
import SectionMain from '../components/Section/Main'
import SectionTitleLineWithButton from '../components/Section/TitleLineWithButton'
import TableSampleClients from '../components/Table/SampleClients'
import { getPageTitle } from '../config'
import useAxios from '../hooks/useAxios'
import Input from '../components/Input/Input'

const TablesPage = () => {


  const { data, error, loading, sendRequest } = useAxios()

  const [isuserUpdate, setIsuserUpdate] = useState(false)
  useEffect(() => {
    sendRequest('user/all')
  }, [isuserUpdate])

  console.log('isuserUpdate', isuserUpdate)

  useEffect(() => {
    setIsuserUpdate(false)
  }, [data])

  return (
    <>
      {/* <Head>
        <title>{getPageTitle('Tables')}</title>
      </Head> */}
      <SectionMain>
        {/* <SectionTitleLineWithButton icon={mdiTableBorder} title="Tables" main>
       
        </SectionTitleLineWithButton> */}

        <h1 className="mb-3 text-3xl font-bold">USERS</h1>

        <CardBox className="mb-6" hasTable>
          <TableSampleClients data={data?.result} setIsuserUpdate={setIsuserUpdate} />
        </CardBox>
      </SectionMain>
    </>
  )
}

TablesPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default TablesPage
