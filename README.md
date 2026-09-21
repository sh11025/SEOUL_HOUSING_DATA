# 서울 주거 데이터 스토리 (Seoul Housing Data Story)

## 2023–2025 서울 임대차·인구 이동·빈집 분석과 2026년 1월 임대차 거래 예측

> **서울의 집은 지금 어디로 움직이고 있을까?**  
> 2023–2025년 서울 25개 자치구의 아파트 전월세 실거래, 인구 이동, 생활인구, 기준금리, 빈집 통계를 통합하고,  
> 머신러닝을 이용해 **2026년 1월 자치구별 임대차 거래 건수**를 예측한 엔드투엔드(End-to-End) 데이터 분석 & 인터랙티브 웹 시각화 프로젝트입니다.

<p align="center">
  <img src="docs/assets/images/home-hero.webp" alt="서울 주거 데이터 스토리" width="820">
</p>

---

## 📽️ Project Presentation (발표 슬라이드 총 30장)

> 본 프로젝트의 기획 배경, 데이터 엔지니어링, 머신러닝 모델링 및 웹 서비스 배포 과정을 담은 30장 발표 슬라이드입니다. 각 구간을 클릭하여 세부 슬라이드를 펼쳐볼 수 있습니다.

| 구간 | 슬라이드 | 장수 | 주요 내용 |
| :--- | :---: | :---: | :--- |
| **01. INTRO** | 1–4 | 4장 | 문제 정의 / 핵심 질문 / 프로젝트 규모 |
| **02. DATA** | 5–8 | 4장 | 데이터 출처 / 파이프라인 / 전처리 / 최종 데이터 |
| **03. EXPLORE SEOUL** | 9–14 | 6장 | 빈집 / 임대차 / 인구이동 EDA |
| **04. MACHINE LEARNING** | 15–22 | 8장 | Target / 시계열 분할 / 모델 / 성능 / 중요도 |
| **05. FORECAST** | 23–25 | 3장 | 2026년 1월 예측 |
| **06. PRODUCT** | 26–27 | 2장 | JSON / 웹 대시보드 |
| **07. TROUBLESHOOTING** | **28** | **1장** | **직접 해결한 4가지 문제** |
| **08. LIMITATION & NEXT** | 29–30 | 2장 | 한계 / 발전 방향 및 결론 |
| **합계** | | **총 30장** | |

<br>

<details open>
<summary><b>▶ 01. INTRO (Slide 1–4) : 문제 정의 / 핵심 질문 / 프로젝트 규모</b></summary>
<br>

| Slide 01 | Slide 02 |
| :---: | :---: |
| <img src="docs/assets/slides/slide-01.png" width="100%" alt="Slide 01"> | <img src="docs/assets/slides/slide-02.png" width="100%" alt="Slide 02"> |
| **Slide 03** | **Slide 04** |
| <img src="docs/assets/slides/slide-03.png" width="100%" alt="Slide 03"> | <img src="docs/assets/slides/slide-04.png" width="100%" alt="Slide 04"> |

</details>

<details>
<summary><b>▶ 02. DATA (Slide 5–8) : 데이터 출처 / 파이프라인 / 전처리 / 최종 데이터</b></summary>
<br>

| Slide 05 | Slide 06 |
| :---: | :---: |
| <img src="docs/assets/slides/slide-05.png" width="100%" alt="Slide 05"> | <img src="docs/assets/slides/slide-06.png" width="100%" alt="Slide 06"> |
| **Slide 07** | **Slide 08** |
| <img src="docs/assets/slides/slide-07.png" width="100%" alt="Slide 07"> | <img src="docs/assets/slides/slide-08.png" width="100%" alt="Slide 08"> |

</details>

<details>
<summary><b>▶ 03. EXPLORE SEOUL (Slide 9–14) : 빈집 / 임대차 / 인구이동 EDA</b></summary>
<br>

| Slide 09 | Slide 10 |
| :---: | :---: |
| <img src="docs/assets/slides/slide-09.png" width="100%" alt="Slide 09"> | <img src="docs/assets/slides/slide-10.png" width="100%" alt="Slide 10"> |
| **Slide 11** | **Slide 12** |
| <img src="docs/assets/slides/slide-11.png" width="100%" alt="Slide 11"> | <img src="docs/assets/slides/slide-12.png" width="100%" alt="Slide 12"> |
| **Slide 13** | **Slide 14** |
| <img src="docs/assets/slides/slide-13.png" width="100%" alt="Slide 13"> | <img src="docs/assets/slides/slide-14.png" width="100%" alt="Slide 14"> |

</details>

<details>
<summary><b>▶ 04. MACHINE LEARNING (Slide 15–22) : Target / 시계열 분할 / 모델 / 성능 / 중요도</b></summary>
<br>

| Slide 15 | Slide 16 |
| :---: | :---: |
| <img src="docs/assets/slides/slide-15.png" width="100%" alt="Slide 15"> | <img src="docs/assets/slides/slide-16.png" width="100%" alt="Slide 16"> |
| **Slide 17** | **Slide 18** |
| <img src="docs/assets/slides/slide-17.png" width="100%" alt="Slide 17"> | <img src="docs/assets/slides/slide-18.png" width="100%" alt="Slide 18"> |
| **Slide 19** | **Slide 20** |
| <img src="docs/assets/slides/slide-19.png" width="100%" alt="Slide 19"> | <img src="docs/assets/slides/slide-20.png" width="100%" alt="Slide 20"> |
| **Slide 21** | **Slide 22** |
| <img src="docs/assets/slides/slide-21.png" width="100%" alt="Slide 21"> | <img src="docs/assets/slides/slide-22.png" width="100%" alt="Slide 22"> |

</details>

<details>
<summary><b>▶ 05. FORECAST (Slide 23–25) : 2026년 1월 예측</b></summary>
<br>

| Slide 23 | Slide 24 |
| :---: | :---: |
| <img src="docs/assets/slides/slide-23.png" width="100%" alt="Slide 23"> | <img src="docs/assets/slides/slide-24.png" width="100%" alt="Slide 24"> |
| **Slide 25** | |
| <img src="docs/assets/slides/slide-25.png" width="100%" alt="Slide 25"> | |

</details>

<details>
<summary><b>▶ 06. PRODUCT (Slide 26–27) : JSON / 웹 대시보드</b></summary>
<br>

| Slide 26 | Slide 27 |
| :---: | :---: |
| <img src="docs/assets/slides/slide-26.png" width="100%" alt="Slide 26"> | <img src="docs/assets/slides/slide-27.png" width="100%" alt="Slide 27"> |

</details>

<details>
<summary><b>▶ 07. TROUBLESHOOTING (Slide 28) : 직접 해결한 4가지 문제</b></summary>
<br>

<p align="center">
  <img src="docs/assets/slides/slide-28.png" width="90%" alt="Slide 28">
</p>

</details>

<details>
<summary><b>▶ 08. LIMITATION & NEXT (Slide 29–30) : 한계 / 발전 방향 및 결론</b></summary>
<br>

| Slide 29 | Slide 30 |
| :---: | :---: |
| <img src="docs/assets/slides/slide-29.png" width="100%" alt="Slide 29"> | <img src="docs/assets/slides/slide-30.png" width="100%" alt="Slide 30"> |

</details>

---

## 1. Project Overview

서울의 주거 시장은 단순히 거래량 하나만으로 설명되지 않습니다. 사람의 이동, 활동 인구, 금리, 그리고 지역별 주택 상황이 유기적으로 맞물려 돌아가기 때문입니다.

본 프로젝트는 5개 주요 공공데이터를 `자치구 + 연월(Year-Month)` 단위의 패널 데이터로 결합하여 다음 질문에 답합니다.

- **임대차 거래량의 흐름**: 지난 3년간 25개 자치구의 전월세 계약은 어떻게 변화했는가?
- **인구와 시장의 관계**: 전입·전출·순이동과 생활인구는 거래량과 어떤 상관관계를 갖는가?
- **서울의 실제 빈집**: 2023–2025년 서울의 미거주 주택은 실제로 늘어났는가, 어떤 주택 유형인가?
- **인공지능 거래 예측**: 과거 지표들을 학습해 **2026년 1월 동네별 거래 건수**를 정밀하게 예측할 수 있는가?
- **시민을 위한 데이터 개방**: 분석 결과가 연구실에 갇히지 않고 누구나 쉽게 볼 수 있는 인터랙티브 웹으로 서비스될 수 있는가?

### 핵심 결과 요약

| 항목 | 결과치 | 비고 |
| :--- | :---: | :--- |
| **분석 대상 지역** | **서울 25개 전 자치구** | 강남구부터 중랑구까지 전역 |
| **분석 대상 기간** | **2023.01 ~ 2025.12** | 36개월간의 시계열 기록 |
| **임대차 원천 실거래** | **812,501건** | 국토교통부 실거래가 공개시스템 |
| **통합 분석 데이터셋** | **900행** | 25개 자치구 × 36개월 패널 데이터 |
| **빈집 분석 데이터셋** | **75행** | 25개 자치구 × 3개년 행정 통계 |
| **최종 머신러닝 모델** | **Random Forest Regressor** | 다수 결정트리 앙상블 |
| **2025년 실전 검증 MAE** | **106.71건** | 한 달 평균 오차 (이전 방식 대비 8% 개선) |
| **2025년 실전 검증 R²** | **0.8892** | 예측 신뢰도 및 설명력 88.9% |
| **최종 미래 예측 시점** | **2026년 1월** | 25개 자치구별 1개월 선행 예측 |

> 💡 **일반인을 위한 핵심 성과 지표 쉬운 해설**
> - **MAE (평균 오차 106.71건)**: 실제 계약 수와 비교했을 때 **"평균적으로 몇 건이나 빗나갔는가?"**를 뜻합니다. 한 달에 수천 건씩 거래되는 자치구에서 평균 106건 차이로 맞혔다는 것은 오차율 약 5~8% 수준의 매우 뛰어난 적중률을 의미합니다.
> - **R² (적중 신뢰도 0.8892 / 88.9점)**: 100점 만점 시험에서 **"인공지능이 시장 흐름을 몇 점이나 맞혔는가?"**를 뜻합니다. 복잡한 서울 주거 거래 움직임의 약 89%를 인공지능이 올바른 규칙으로 정확하게 포착해냈음을 나타냅니다.
> - **RMSE (엄격한 오차 179.61건)**: 유독 크게 빗나간 예외적인 실수에 더 큰 벌점을 매겨 엄격하게 평가한 오차 성적표입니다.

---

## 2. Why This Project? (기획 배경 및 핵심 관점)

주거 시장을 볼 때 흔히 "전출 인구가 많으면 빈집도 많아질 것"이라고 단순하게 추측하기 쉽습니다.  
하지만 **전출 인구와 실제 빈집은 같은 지표가 아닙니다.**

1. **전출 인구 ≠ 새로 발생한 빈집**: 세입자가 다른 동네로 이사를 가도, 당일 새로운 세입자가 입주하면 빈집은 발생하지 않습니다.
2. **거래 감소 ≠ 공실**: 전월세 거래 건수가 줄어든 것이 이사를 안 가고 살던 집에서 재계약을 맺었기 때문일 수 있습니다.
3. **빈집의 본질**: 서울시 통계의 빈집은 농어촌의 '폐가'가 아니라 신축 입주 전 대기나 리모델링 등 일시적 공실이 대부분입니다.

따라서 본 프로젝트에서는 두 과제를 명확히 분리했습니다:
- **임대차 시장 예측**: 월별 계약 건수를 Target으로 두고 인구 이동, 생활인구, 기준금리를 Feature로 사용
- **빈집 분석**: 서울시 주택총조사의 실제 미거주 주택(빈집) 수를 별도로 정밀 분석

> 즉, 본 프로젝트가 머신러닝으로 예측하는 대상은 **빈집 수나 공실률이 아니라 다음 달의 임대차 계약 건수**입니다.

---

## 3. Data Sources & Official Links (공식 자료 수집처 모음)

본 프로젝트는 검증된 공공데이터 포털 및 공공기관 API를 기반으로 구축되었습니다.

| 데이터명 | 제공 기관 | 수집 기간 / 규모 | 주요 변수 | 공식 자료 수집처 링크 |
| :--- | :--- | :---: | :--- | :--- |
| **아파트 전월세 실거래가** | 국토교통부 | 2023–2025 (812,501건) | 계약일, 자치구, 보증금, 월세 등 | [국토교통부 실거래가 공개시스템](https://data.seoul.go.kr/dataList/OA-15439/S/1/datasetView.do) |
| **서울 자치구 생활인구** | 서울열린데이터광장 | 2023–2025 (일별 집계) | 기준일ID, 자치구코드, 총생활인구수 | [서울 열린데이터광장 생활인구](https://data.seoul.go.kr/dataList/OA-14991/S/1/datasetView.do) |
| **국내 인구이동통계** | KOSIS 국가통계포털 | 2023–2025 (월별 집계) | 총전입, 총전출, 순이동 | [KOSIS 국내인구이동통계](https://kosis.kr/statHtml/statHtml.do?sso=ok&returnurl=https%3A%2F%2Fkosis.kr%3A443%2FstatHtml%2FstatHtml.do%3Flist_id%3DA_1%26obj_var_id%3D%26seqNo%3D%26tblId%3DDT_1B26001_A01%26vw_cd%3DMT_ZTITLE%26orgId%3D101%26path%3D%252FstatisticsList%252FstatisticsListIndex.do%26conn_path%3DMT_ZTITLE%26itm_id%3D%26lang_mode%3Dko%26scrId%3D%26) |
| **한국은행 기준금리** | ECOS 경제통계시스템 | 2023–2025 (월별 집계) | 한국은행 기준금리(%) | [한국은행 ECOS 통계시스템](https://ecos.bok.or.kr/#/SearchStat) |
| **서울 미거주 주택(빈집)** | 서울시 통계 / 주택총조사 | 2023–2025 (연도별) | 총 빈집 수, 주택유형별 빈집 수 | [서울시 빈집 통계 데이터](https://data.seoul.go.kr/dataList/DT201004B010013/S/2/datasetView.do) |

---

## 4. Project Structure (프로젝트 구조)

```text
DATA/
├── .env                                  # API 키 및 DB 접속 비밀번호 (로컬 보관, Git 제외)
├── .env.example                          # 환경변수 설정 템플릿
├── .gitignore                            # 대용량 파일 및 가상환경 제외 설정
├── README.md                             # 프로젝트 전체 종합 매뉴얼 및 분석 보고서
│
├── notebooks/                            # 주피터 노트북 데이터 & ML 파이프라인
│   ├── 01_data_pipeline_final.ipynb      # 5대 공공데이터 수집, 전처리 및 MySQL 적재
│   ├── 02_machine_learning_final_clean.ipynb # 머신러닝 모델 학습, 시간순 검증 및 평가
│   ├── 03_vacancy_market_analysis_final.ipynb# 빈집-시장 상관관계 및 주택유형 분석
│   └── 04_dashboard_data_final.ipynb    # 웹 시각화용 경량 JSON 데이터 추출
│
├── data/                                 # 데이터 디렉터리 (Git 제외)
│   ├── raw/                              # 원천 CSV 다운로드 파일 배치
│   │   ├── LOCAL_PEOPLE_GU_2023.csv
│   │   ├── LOCAL_PEOPLE_GU_2024.csv
│   │   ├── LOCAL_PEOPLE_GU_2025.csv
│   │   ├── ecos_base_rate_2023_2025.csv
│   │   ├── kosis_migration_2023_2025.csv
│   │   └── vacancy_seoul_2023_2025.csv
│   └── processed/
│       └── seoul_rent_2023_2025_clean.csv
│
└── docs/                                 # GitHub Pages 웹 대시보드 서비스
    ├── index.html                        # 메인 스토리 및 핵심 지표 소개
    ├── vacancy.html                      # 빈집 현황 및 주택유형별 상세 분석
    ├── market.html                       # 자치구별 월별 임대차 계약 추이
    ├── population.html                   # 전입·전출·순이동 및 생활인구 분석
    ├── forecast.html                     # 2026년 1월 AI 예측 랭킹 및 포커스
    ├── district.html                     # 서울 25개 자치구 통합 원스톱 탐색기
    ├── app.js                            # 공통 인터랙션 및 알약 내비게이션 모션
    ├── style.css                         # 통일된 디자인 시스템 토큰 및 반응형 CSS
    ├── *-detail.css / *-detail.js        # 페이지별 시각화 모듈
    ├── assets/                           # 정적 미디어 (home-hero.webp, back.gif 등)
    └── data/                             # 브라우저용 초경량 JSON 캐시
        ├── market.json                   # 900개 구-월별 관측치
        ├── vacancy.json                  # 75개 구-연도별 빈집 기록
        ├── forecast.json                 # 25개 자치구 2026-01 예측값
        └── summary.json                  # 대시보드 상단 집계 요약
```

---

## 5. Quick Start (환경 설정 및 실행 순서 8단계)

본 프로젝트는 누구나 로컬 환경에서 재현할 수 있도록 체계적인 파이프라인으로 구성되어 있습니다.

### 1단계: 가상환경 생성 및 패키지 설치
Windows PowerShell 기준:
```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install pandas requests python-dotenv sqlalchemy pymysql scikit-learn matplotlib jupyter
```

### 2단계: 환경변수(`.env`) 작성
프로젝트 루트 디렉터리에 `.env` 파일을 생성하고 발급받은 API 키와 로컬 MySQL 계정을 입력합니다:
```env
MOLIT_API_KEY=발급받은_공공데이터포털_API_KEY
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=MySQL비밀번호
DB_NAME=seoul_rent
```
> **보안 주의**: `.env` 파일은 비밀번호가 포함되어 있으므로 절대 GitHub에 커밋하지 않습니다. 템플릿인 `.env.example`만 업로드합니다.

### 3단계: MySQL 데이터베이스 생성
MySQL 콘솔에 접속하여 데이터베이스를 생성합니다:
```sql
CREATE DATABASE seoul_rent DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 4단계: 원천 CSV 파일 배치
`data/raw/` 폴더에 다운로드받은 6개 공공데이터 CSV 파일을 배치합니다:
- `kosis_migration_2023_2025.csv`
- `ecos_base_rate_2023_2025.csv`
- `LOCAL_PEOPLE_GU_2023.csv` / `2024.csv` / `2025.csv`
- `vacancy_seoul_2023_2025.csv`

### 5단계: 파이프라인 노트북 실행 (`01_data_pipeline_final.ipynb`)
- Jupyter Kernel을 `.venv\Scripts\python.exe`로 선택한 후 **Restart Kernel → Run All Cells** 실행
- 국토부 API 수집, CSV 정제, 월별 집계 및 MySQL 테이블 저장이 자동으로 진행됩니다.

### 6단계: MySQL 적재 결과 확인 (무결성 검증)
`ml_rent_market` 테이블이 **정확히 900행**인지 확인합니다:
```sql
SELECT COUNT(*) FROM seoul_rent.ml_rent_market; -- 결과: 900
```

### 7단계: 머신러닝 모델링 실행 (`02_machine_learning_final_clean.ipynb`)
- **Restart Kernel → Run All Cells** 실행
- 시간순 검증(Train/Test), Baseline/Linear/Random Forest 모델 비교, 2026-01 예측이 완수됩니다.

### 8단계: 로컬 웹 대시보드 확인
웹 서버를 띄워 인터랙티브 대시보드를 확인합니다:
```powershell
python -m http.server 8000 -d docs
```
브라우저에서 `http://localhost:8000`으로 접속하여 인터랙티브 데이터 스토리를 탐색합니다.

---

## 6. Data Pipeline & Gotchas (전처리 실무 주의사항)

실제 이종 공공데이터를 정제하는 과정에서 마주친 실무 이슈들과 이를 해결한 엔지니어링 규칙입니다.

```text
[Public Data Sources]
   │
   ├─ 국토부 전월세 실거래 API  (812,501 rows)
   ├─ KOSIS 인구이동 CSV         (2단 헤더 구조)
   ├─ 한국은행 기준금리 CSV      (시계열 피벗)
   ├─ 서울시 생활인구 CSV        (연도별 인코딩·컬럼 불일치)
   └─ 서울시 빈집 통계 CSV       (주택유형별 집계)
   │
   ▼
[01_data_pipeline_final.ipynb]  ──▶ 수집 · 전처리 · 정합성 검증
   │
   ▼
[MySQL: seoul_rent]
   ├─ rental_transactions        (812,501 rows)
   ├─ migration                  (900 rows)
   ├─ interest_rate              (36 rows)
   ├─ living_population          (900 rows)
   └─ ml_rent_market             (900 rows - 통합 패널 테이블)
   │
   ├───────────────────────────────┐
   ▼                               ▼
[02 Machine Learning]        [03 Vacancy Analysis]
   │                               │
   ▼                               ▼
rent_forecast_2026_01       vacancy_market_analysis
   (25 rows)                       (75 rows)
   └───────────────┬───────────────┘
                   ▼
       [04_dashboard_data_final.ipynb]
                   │
                   ▼
          docs/data/*.json (경량 정적 캐시)
                   │
                   ▼
       GitHub Pages Web Dashboard
```

### 6.1 국토교통부 임대차 실거래가 (MOLIT API)
- **URL-Encoding 403 오류 해결**: 발급받은 인증키가 이미 URL-encoded 상태인 경우 `requests.get(..., params=params)`에 전달하면 이중 인코딩되어 403 Forbidden이 발생합니다. 본 프로젝트에서는 `serviceKey`를 URL 파라미터 스트링에 직접 안전하게 결합해 호출했습니다.
- **고유 식별자 부재에 따른 주의**: 공공 실거래가에는 거래 고유 ID가 부여되지 않습니다. 동일 단지, 동일 층수, 동일 날짜에 맺어진 실제 계약이 여러 건 존재할 수 있으므로, 임의로 전체 컬럼에 `drop_duplicates()`를 실행하여 실제 계약을 누락시키는 실수를 원천 방지했습니다.

### 6.2 KOSIS 국내인구이동통계
- **2단 멀티 헤더(Multi-Header) 구조**: KOSIS CSV 파일은 상단 2행에 걸쳐 계층형 헤더가 지정되어 있습니다. `pd.read_csv(..., header=[0, 1])`을 명시적으로 선언하여 컬럼을 안전하게 평탄화(Flatten)했습니다.

### 6.3 서울시 생활인구 (가장 중요한 인코딩/컬럼명 불일치)
서울시 생활인구 데이터는 **연도별로 파일 인코딩과 컬럼명이 상이**합니다. 이를 명시적으로 보정했습니다:
```python
# 1. 파일별 인코딩 분기 처리
pop_2023 = pd.read_csv("../data/raw/LOCAL_PEOPLE_GU_2023.csv", encoding="cp949")
pop_2024 = pd.read_csv("../data/raw/LOCAL_PEOPLE_GU_2024.csv", encoding="utf-8")
pop_2025 = pd.read_csv("../data/raw/LOCAL_PEOPLE_GU_2025.csv", encoding="cp949")

# 2. 2023년 한글 컬럼명을 2024/2025년 표준 영문 컬럼명으로 통일
pop_2023 = pop_2023.rename(columns={
    "기준일ID": "stdr_de_id",
    "자치구코드": "adstrd_code_se",
    "총생활인구수": "tot_lvpop_co"
})
```

### 6.4 Excel 편집 절대 금지 원칙
CSV 파일을 Microsoft Excel에서 열고 저장할 경우 UTF-8 BOM, 쉼표 구분자 누락, 다중 헤더 훼손이 발생할 수 있습니다. **원본 데이터는 Excel로 재저장하지 않고 파이썬 스크립트 내에서만 처리**하도록 강제했습니다.

### 6.5 최종 통합 테이블 검증 결과
`ml_rent_market` 테이블의 최종 생성 상태:
```text
최종 DataFrame Shape: (900, 8)
분석 기간: 2023-01 ~ 2025-12 (36개월)
전체 컬럼 결측치(NaN): 0건
자치구 + 연월(guName + yearMonth) 중복 키: 0건
MySQL seoul_rent 저장 완료: 900건
```

---

## 7. Vacancy Analysis (빈집 데이터 심층 분석)

서울시 주택총조사의 실제 미거주 주택(빈집) 통계 75건(25개 구 × 3개년)을 분석했습니다.

### 연도별 서울 전체 빈집 추이
- **2023년**: 107,681호
- **2024년**: 102,556호
- **2025년**: **126,290호 (전년 대비 +23.1% 증가 🔺)**

### 2025년 주택 유형별 빈집 분포
1. **아파트**: **68,430호 (54.2%)** ➡️ 전체 빈집의 절반 이상이 아파트
2. **다세대·빌라**: **35,120호 (27.8%)** ➡️ 아파트 + 다세대가 82.0% 차지
3. **단독주택**: **14,210호 (11.3%)**
4. **연립주택 등 기타**: **8,530호 (6.7%)**

### 빈집 수와 주요 시장 변수의 상관관계

| 비교 변수 | 빈집 수와의 통계적 상관계수 (Correlation) | 해석 |
| :--- | :---: | :--- |
| **임대차 거래 건수** | **+0.686** | 거래가 활발하고 주택 규모가 큰 동네일수록 빈집 절대 수도 큼 |
| **월평균 생활인구** | **+0.592** | 활동 인구가 많은 핵심 도심일수록 주택 재고와 빈집 수 공존 |
| **전출 인구** | **+0.445** | 인구 이동 규모와의 뚜렷한 동행 관계 |
| **전입 인구** | **+0.440** | 전출뿐만 아니라 전입 역시 비슷한 상관성을 보임 |
| **순이동 (`전입 - 전출`)**| **+0.090** | 단순 순이동 수치와 빈집 절대 수의 연관성은 매우 낮음 |
| **한국은행 기준금리** | **-0.143** | 거시 금리와 빈집 절대량 사이에는 미세한 음(-)의 관계 |

> **해석 주의**: 상관관계는 원인과 결과를 뜻하지 않습니다. 자치구별 총 주택 수(분모)가 반영되지 않은 '절대 빈집 수'이므로, 주택 재고가 큰 대형 자치구(강남, 송파, 강서 등)가 높은 수치를 나타냅니다.

---

## 8. Machine Learning (머신러닝 모델링 및 검증)

### 8.1 예측 목표(Target)와 입력 변수(Features)
인공지능에게 현재 시점($t$)의 정보를 주고, **다음 달($t+1$)의 임대차 계약 건수**를 맞히도록 설계했습니다.

```python
# 다음 달 계약 건수 Target 생성 (자치구별 1칸 시프트)
df["nextContractCount"] = df.groupby("guName")["contractCount"].shift(-1)
```
- 최종 시점인 2025년 12월은 2026년 1월 실제 정답 라벨이 없으므로 학습용 데이터에서 제외되어, 모델링 데이터는 총 **875행**이 됩니다.

**입력 변수 7종**:
`contractCount` (당월 거래량), `avgLivingPop` (생활인구), `moveIn` (전입), `moveOut` (전출), `netMove` (순이동), `baseRate` (기준금리), `month` (계절성)

### 8.2 미래를 엿보지 않는 시간 기준 분할 (Time-based Split)
시계열 데이터에서 과거와 미래를 무작위로 섞어서 검증하면 미래 시험 정답을 보고 과거를 맞히는 **데이터 누수(Data Leakage)**가 발생합니다.  
이를 완벽히 차단하기 위해 철저한 시간 기준 분할을 적용했습니다:

```text
[ 2023.01 ~ 2024.12 학습용 Train 데이터 (600행) ] │ [ 2025.01 ~ 2025.12 실전 검증 Test 데이터 (275행) ]
```

### 8.3 모델 성능 대결 (2025년 실전 검증 결과)

| 모델 알고리즘 | 평균 오차(MAE, 건) ↓ | 제곱평균오차(RMSE, 건) ↓ | 결정계수(R², 정확도) ↑ | 평가 |
| :--- | :---: | :---: | :---: | :--- |
| **기준 모델 (Persistence Baseline)** | 115.74 | 196.67 | 0.8672 | "지난달과 같을 것이다" 단순 가정 |
| **선형 회귀 (Linear Regression)** | 113.98 | 192.56 | 0.8727 | 다중공선성 고려 `netMove` 제외 |
| **랜덤 포레스트 (Random Forest)** | **106.71** | **179.61** | **0.8892** | **🏆 최종 모델 선정 (오차 8% 감소)** |

> Random Forest 모델이 비선형 패턴과 복합적인 상호작용을 가장 정밀하게 파악하여 **한 달 평균 오차 106.7건, 설명력 88.9%**로 가장 우수한 성적을 기록했습니다.

#### 💡 일반인을 위한 평가 지표 쉬운 가이드
- **MAE (Mean Absolute Error, 평균 절대 오차)**: `실제 계약수 - 예측 계약수`의 단순 평균 차이입니다. "평균적으로 단 106건 차이로 아주 근접하게 맞혔다"는 의미입니다.
- **R² (R-squared, 결정계수)**: 전체 시장 변동을 모델이 얼마나 설명해내는지를 나타내는 1.0(100%) 만점 성적표입니다. 실물 경제 데이터에서 0.889(88.9점)는 학계와 실무에서 대단히 높은 신뢰도를 나타냅니다.
- **RMSE (Root Mean Squared Error, 제곱평균제곱근오차)**: 큰 오차에 더 큰 벌점을 주어 평가하는 지표로, 특정 자치구에서 터무니없는 실수가 없었는지를 엄격히 검증합니다.

### 8.4 변수 중요도 (Feature Importance)

| 입력 변수 (Feature) | 중요도 기여율 (Importance) | 의미 해석 |
| :--- | :---: | :--- |
| **`contractCount`** (직전 월 거래량) | **67.72%** | 부동산 시장의 강한 관성(지난달 거래 수준이 다음 달로 강력히 이어짐) |
| **`avgLivingPop`** (월평균 생활인구) | **25.50%** | 주민등록 인구보다 실제 거리를 오가는 활동 인구가 수요의 핵심 지표 |
| **`moveIn`** (전입 인구) | 1.85% | 외부 유입 신호 |
| **`moveOut`** (전출 인구) | 1.80% | 외부 이탈 신호 |
| **`netMove`** (순이동 인구) | 1.62% | 순유입/순유출 지표 |
| **`month`** (기준 월) | 1.36% | 봄·가을 이사철 및 겨울 비수기 등 계절 요인 |
| **`baseRate`** (한국은행 기준금리) | 0.15% | 거시 경제 요인 |

---

## 9. 2026-01 Forecast (2026년 1월 실전 예측 결과)

2025년 검증을 성공적으로 마친 후, 2023년 1월부터 2025년 11월까지의 전체 875개 라벨 데이터로 Random Forest를 재학습시켰습니다.  
그리고 **2025년 12월의 최신 지표들을 입력하여 2026년 1월 자치구별 아파트 임대차 거래 건수**를 최종 산출했습니다.

### 대표 자치구 예측 결과 (2025.12 실제 ➡️ 2026.01 예측)

| 자치구 | 2025년 12월 실제 거래 | 2026년 1월 AI 예측치 | 변화율 | 지역 특성 및 예측 배경 |
| :--- | :---: | :---: | :---: | :--- |
| **강남구** | 2,798건 | **2,685건** | -4.0% | 연말 거래 급증세 이후 소폭의 숨고르기 안정세 |
| **송파구** | 2,770건 | **2,257건** | -18.5% | 대단지 아파트 밀집 지역으로 겨울철 비수기 진입 |
| **노원구** | 1,549건 | **1,566건** | +1.1% | 중계동 등 전통 학군 수요로 견고한 거래 유지 |
| **서초구** | 1,520건 | **1,488건** | -2.1% | 핵심 상급지 거래 흐름의 안정적 유지 |
| **강서구** | 1,311건 | **1,326건** | +1.1% | 마곡 배후 주거지 중심의 꾸준한 임대차 수요 |
| **서대문구** | 829건 | **1,062건** | **+28.1% 🔺**| **신촌 대학가 신학기 진입에 따른 청년 임대차 수요 폭증** |

> 25개 전체 자치구의 정밀 예측 데이터는 `docs/data/forecast.json` 및 웹 대시보드에서 전수 열람하실 수 있습니다.

---

## 10. Interactive Web Dashboard (웹 서비스 구현)

분석 결과를 브라우저에서 누구나 직관적으로 탐색할 수 있도록 GitHub Pages 기반의 반응형 인터랙티브 웹 대시보드로 배포했습니다.

<p align="center">
  <img src="docs/assets/images/forecast-hero.webp" alt="2026 AI 예측 대시보드" width="760">
</p>

### 서브 페이지 구성
1. **`index.html` (메인 개요)**: 3개년 81만 건 프로젝트의 기획 의도와 4가지 핵심 신호 소개
2. **`vacancy.html` (빈집 현황)**: 연도별 빈집 추이, 자치구별 순위, 아파트·빌라 등 주택유형별 분포
3. **`market.html` (임대차 시장)**: 자치구별 월별 계약 건수 인터랙티브 꺾은선 차트 및 상세 필터 검색
4. **`population.html` (인구 이동)**: 자치구별 전입·전출 듀얼 라인 차트 및 생활인구 비교 분석
5. **`forecast.html` (2026 AI 예측)**: 2025년 12월 실제값과 2026년 1월 AI 예측값의 25개 구 정밀 비교
6. **`district.html` (우리 동네 탐색기)**: 지도에서 자치구를 클릭하면 거래·인구·빈집·예측을 한 화면에 표시

### 프론트엔드 핵심 인터랙션 기술
- **페이지 간 슬라이딩 알약 내비게이션 (`.pill-nav`)**: `sessionStorage`를 이용해 이전 페이지 클릭 위치를 기억하고, 새 페이지 로드 시 파란 인디케이터가 스르륵 미끄러져 들어오는 부드러운 앱 감성 연출
- **반응형 도식 지도 (Schematic Map)**: 서울 25개 자치구를 격자형 셀로 배치하여 마우스 클릭 즉시 모든 차트와 지표가 실시간 동기화
- **실시간 데이터 툴팁 및 카운트업**: SVG 차트 호버 시 다크 테마 툴팁 노출 및 숫자 카운트업 애니메이션

---

## 11. Troubleshooting (오류 해결 실무 가이드)

실행 중 발생할 수 있는 주요 에러와 해결 방법입니다.

### 1. `ModuleNotFoundError: No module named '...'`
가상환경 활성화 상태를 확인하고 필수 라이브러리를 설치합니다:
```powershell
.\.venv\Scripts\python.exe -m pip install pandas requests python-dotenv sqlalchemy pymysql scikit-learn matplotlib
```

### 2. `UnicodeDecodeError: 'utf-8' codec can't decode...`
서울시 생활인구 및 KOSIS 파일의 인코딩을 확인합니다. 2023/2025 생활인구는 `cp949`, 2024 생활인구는 `utf-8`입니다:
```python
pd.read_csv("...", encoding="cp949")
```

### 3. `KeyError: '...'`
KOSIS 인구이동 CSV 파일의 멀티 헤더 구조를 확인합니다. `header=[0, 1]`을 선언했는지, 다운로드받은 기간에 2023, 2024, 2025 연월 컬럼이 모두 포함되어 있는지 확인합니다.

### 4. MySQL 연결 오류 (`OperationalError: Can't connect to MySQL server`)
- MySQL 서비스가 켜져 있는지 확인 (`net start MySQL` 또는 작업 관리자)
- `.env`의 `DB_HOST`, `DB_PORT`, `DB_PASSWORD` 정보가 정확한지 확인
- `CREATE DATABASE seoul_rent;`가 선행되었는지 확인

---

## 12. Final Checklist (최종 점검 체크리스트)

프로젝트를 실행하거나 제출하기 전 아래 항목을 점검하세요:

- [ ] MySQL 서버가 실행 중이며 `seoul_rent` DB가 생성되어 있는가?
- [ ] `.env` 파일에 유효한 `MOLIT_API_KEY`와 DB 접속 정보가 입력되어 있는가?
- [ ] `data/raw/` 폴더에 6개 필수 공공데이터 CSV가 모두 배치되어 있는가?
- [ ] 생활인구 2023(cp949), 2024(utf-8), 2025(cp949) 인코딩 분기가 적용되었는가?
- [ ] KOSIS CSV 파일의 2단 헤더(`header=[0, 1]`)가 정상 처리되었는가?
- [ ] `01_data_pipeline_final.ipynb` 실행 후 `ml_rent_market` 테이블이 900행인가?
- [ ] `02_machine_learning_final_clean.ipynb` 실행 후 MAE 106건, R² 0.889를 확인했는가?
- [ ] `04_dashboard_data_final.ipynb` 실행 후 `docs/data/*.json` 4개 파일이 갱신되었는가?
- [ ] `DATA.zip` 등 100MB 초과 대용량 파일이 `.gitignore`에 등록되어 있는가?

---

## 13. Limitations (데이터 해석 시 6가지 주의사항)

본 프로젝트의 결과를 해석할 때 반드시 고려해야 할 정직한 한계점들입니다:

1. **임대차 거래 건수 ≠ 빈집 수**: 전월세 거래가 줄었다고 해서 해당 지역에 빈집이 늘어난 것은 아닙니다.
2. **전출 인구 ≠ 새로 발생한 빈집**: 한 세대가 이사를 나가도 다른 세대가 즉시 전입하면 공실은 0채입니다.
3. **빈집 절대 수 ≠ 공실률**: 전체 주택 재고(분모)가 반영되지 않은 단순 호수 비교이므로 대규모 주거지역의 수치가 높게 나타납니다.
4. **변수 중요도(Importance) ≠ 인과관계**: Random Forest의 Feature Importance는 예측 과정에서의 기여도일 뿐, 해당 변수가 거래량을 조작하는 원인은 아닙니다.
5. **2026년 1월 단 한 달만 직접 예측**: 본 모델은 1-Step 선행 예측 구조이므로 2026년 연간 전체를 직접 예측하지 않습니다.
6. **미래 Feature 가용성 가정**: 다음 달을 예측할 때 현재 월의 생활인구와 인구이동 데이터가 이미 수집되어 있다는 전제를 둡니다.

---

## 14. Future Work (향후 발전 과제)

- 🏠 **총 주택 재고 결합 빈집률 분석**: 자치구별 총 주택 수를 분모로 도입해 정밀한 '공실 비율(%)' 도출
- 📑 **전세 / 월세 분리 모델링**: 최근 전세사기 여파 및 월세화 가속화 트렌드를 분리 반영한 예측 고도화
- 💰 **가격 수준(보증금·월세액) 결합**: 거래 건수뿐만 아니라 실거래 가격 변동 추이 예측
- 📈 **시계열 딥러닝 및 부스팅 모델 비교**: XGBoost, LightGBM, LSTM 등 고도화 모델과의 성능 비교
- 🗓️ **2026년 다개월(Multi-Step) 시나리오 예측**: 미래 인구·금리 가상 시나리오를 바탕으로 한 중장기 예측 확장
- ⚙️ **GitHub Actions 자동화 파이프라인**: 매월 갱신되는 공공데이터를 자동으로 수집·예측·웹 갱신하는 CI/CD 구축

---

## 15. Tech Stack (기술 스택)

| 분류 | 사용 기술 | 상세 용도 |
| :--- | :--- | :--- |
| **언어** | Python 3.10+, JavaScript (ES6+) | 데이터 엔지니어링, 모델링, 웹 프론트엔드 |
| **데이터 정제** | pandas, NumPy | 81만 건 결측치 처리, 인코딩 변환, 패널 데이터 결합 |
| **API 통신** | requests, xml.etree.ElementTree | 국토교통부 실거래가 XML API 수집 및 파싱 |
| **데이터베이스** | MySQL 8.0, SQLAlchemy, PyMySQL | 중앙 정형 데이터베이스 스키마 설계 및 무결성 검증 |
| **머신러닝** | scikit-learn | 시간순 분할(Time-based), Random Forest, 선형 회귀 |
| **데이터 시각화** | Matplotlib, Seaborn | 탐색적 데이터 분석(EDA), 상관관계 히트맵, 잔차 분석 |
| **웹 대시보드** | HTML5, CSS3 (Vanilla), Vanilla JS | 6개 서브페이지 인터랙티브 웹, 반응형 모바일 UI |
| **배포 및 인프라** | GitHub Pages, Git | 정적 웹 호스팅 서비스 및 버전 관리 |

---

## 16. Summary

> **"서울의 주거 데이터를 하나의 이야기로 연결하다."**

본 프로젝트는 2023–2025년 서울의 아파트 실거래, 인구 이동, 생활인구, 금리, 빈집 통계를 MySQL로 통합하고, Random Forest를 통해 **2026년 1월 자치구별 임대차 계약 건수(정확도 88.9%)**를 예측했습니다.  

분석 결과를 주피터 노트북에만 묻어두지 않고, 경량 JSON 파이프라인을 거쳐 **시민 누구나 마우스 클릭 한 번으로 확인하는 인터랙티브 웹 데이터 스토리**로 완성했다는 점이 본 프로젝트의 핵심 가치입니다.
