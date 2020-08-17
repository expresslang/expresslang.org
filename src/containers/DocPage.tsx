import React from 'react'
import { Helmet } from 'react-helmet'
import { useRouteData, useRoutePath } from 'react-static'
import { Link as RouterLink, useLocation } from '@reach/router'

import { DocPage as DocPageComponent } from '@riboseinc/aperis-doc-pages'
import { DocPage, DocsPageNavItem } from '@riboseinc/aperis-doc-pages/types'

import Asciidoc from 'components/Asciidoc'
import { Link, normalizeInternalHRef } from 'components/linksButtons'
import MaintainingOrgBanner from 'components/MaintainingOrgBanner'

import symbol from 'assets/SymbolOutlined.svg'
import styled from 'styled-components'


const DOCS_ROOT = '/docs/'


export default () => {
  const { docPage, docsNav }: { docPage: DocPage, docsNav: DocsPageNavItem[] } = useRouteData()
  const loc = useLocation().pathname
  const routePath = (useRoutePath as () => string)()

  function pathIsCurrent(path: string, relative?: string | boolean) {
    return normalizeInternalHRef(loc, path, relative) === `/${routePath}/`
  }

  return (
    <>
      <Helmet>
        <title>{docPage.data?.title} — EXPRESS language reference</title>
      </Helmet>

      <DocPageComponent
        AsciidocComponent={Asciidoc}
        LinkComponent={Link}
        pathIsCurrent={pathIsCurrent}
        rootURLPath={DOCS_ROOT}
        header={<Header to="/"><Symbol alt="EXPRESS" src={symbol} /></Header>}
        footer={<MaintainingOrgBanner />}
        page={docPage}
        nav={docsNav}
      />
    </>
  )
}


const Header = styled(RouterLink)`
  height: 4rem;
  padding-top: 1rem;
  margin-top: 0px;
  justify-content: flex-start;
  display: flex;
  flex-flow: row nowrap;
`


const Symbol = styled.img`
  max-height: 100%;
  max-width: 100%;
`
