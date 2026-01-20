import MetaHead from '../components/MetaHead'

const About = () => (
  <div className="page">
    <MetaHead title="소개" description="블로그와 운영자 소개" />
    <section className="hero">
      <p className="eyebrow">About</p>
      <h1>이 공간에 대하여</h1>
      <p className="lede">
        SF Bay Area에서 작업하는 엔지니어의 블로그입니다. 코드, 제품, 디자인에 대한 생각을 꾸준히 기록합니다.
      </p>
    </section>

    <section className="about-section">
      <h2>원칙</h2>
      <ul>
        <li>Markdown으로 작성, GitHub Pages로 배포</li>
        <li>모바일/데스크톱 가독성 우선</li>
        <li>라이트/다크 모드 모두 최적화</li>
      </ul>

      <h2>연락</h2>
      <p>문의는 GitHub Issues나 이메일로 부탁드립니다.</p>
    </section>
  </div>
)

export default About
