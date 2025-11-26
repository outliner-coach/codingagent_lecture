import React, { useState } from 'react';
import { 
  Brain, Zap, Target, Search, BookOpen, UserCheck, CheckCircle, 
  AlertTriangle, Sparkles, Send, Loader, ChevronRight, RefreshCw, 
  Library, Database, BarChart3, ArrowRight, Code, Mail, FileText, PenTool,
  XCircle, Check
} from 'lucide-react';

const AIManagementGuide = () => {
  const [activeTab, setActiveTab] = useState('pretraining');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-3">
            AI의 작동 원리 이해
          </h1>
          <p className="text-slate-600 text-lg">
            AI는 어떻게 학습하고 생각할까요?<br/>
            <span className="text-indigo-600 font-bold">기초 학습</span>부터 <span className="text-purple-600 font-bold">실전 업무 지시</span>까지 한 번에 마스터하세요.
          </p>
        </header>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <TabButton 
            id="pretraining" 
            label="0. 기초 (Pre-training)" 
            icon={<Library className="w-4 h-4" />} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
          />
          <TabButton 
            id="concept" 
            label="1. 심화 (RLVR)" 
            icon={<Brain className="w-4 h-4" />} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
          />
          <TabButton 
            id="simulation" 
            label="2. 실전 시뮬레이션" 
            icon={<Zap className="w-4 h-4" />} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
          />
          <TabButton 
            id="checklist" 
            label="3. AI 활용 체크리스트" 
            icon={<Target className="w-4 h-4" />} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
          />
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 min-h-[600px] transition-all duration-300">
          {activeTab === 'pretraining' && <PretrainingSection />}
          {activeTab === 'concept' && <ConceptSection />}
          {activeTab === 'simulation' && <SimulationSection />}
          {activeTab === 'checklist' && <ChecklistSection />}
        </div>

      </div>
    </div>
  );
};

// --- Components ---

const TabButton = ({ id, label, icon, activeTab, setActiveTab }) => (
  <button
    onClick={() => setActiveTab(id)}
    className={`flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full font-medium text-sm md:text-base transition-all duration-200 ${
      activeTab === id
        ? 'bg-indigo-600 text-white shadow-md transform scale-105'
        : 'bg-white text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200'
    }`}
  >
    {icon}
    {label}
  </button>
);

// 0. Pre-training Section
const PretrainingSection = () => {
  const [step, setStep] = useState(0);

  const nextTokenScenario = [
    { token: "대한민국의", prob: [
      { text: "수도는", p: 85, type: "high" },
      { text: "역사는", p: 10, type: "mid" },
      { text: "사과는", p: 1, type: "low" }
    ]},
    { token: "수도는", prob: [
      { text: "서울이다", p: 92, type: "high" },
      { text: "부산이다", p: 5, type: "low" },
      { text: "크다", p: 3, type: "low" }
    ]},
    { token: "서울이다", prob: [
      { text: ".", p: 99, type: "high" },
      { text: "그리고", p: 0.5, type: "low" },
      { text: "하지만", p: 0.5, type: "low" }
    ]}
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-indigo-900 mb-2">모든 지식의 시작: 프리트레이닝</h2>
        <p className="text-slate-500">AI는 어떻게 처음 말을 배울까요? 바로 <span className="font-bold text-indigo-600">"다음 단어 맞히기 놀이"</span>입니다.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
        {/* Concept Card */}
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 h-full">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
              <Library className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-700">바벨의 도서관 읽기</h3>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            프리트레이닝(Pre-training)은 AI가 인터넷의 방대한 텍스트를 읽으며 
            <strong> "이 단어 뒤에 어떤 단어가 올 확률이 높은가?"</strong>를 배우는 과정입니다.
          </p>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex gap-2 items-center"><Database className="w-4 h-4 text-slate-400"/> 세상의 모든 지식을 압축</li>
            <li className="flex gap-2 items-center"><BarChart3 className="w-4 h-4 text-slate-400"/> 확률 통계 학습 (Next Token Prediction)</li>
          </ul>
        </div>

        {/* Interactive Demo */}
        <div className="bg-white border-2 border-indigo-100 rounded-xl p-6 shadow-sm h-full flex flex-col justify-center">
          <h4 className="font-bold text-indigo-900 mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-500" />
            Next Token Prediction 체험
          </h4>
          
          <div className="bg-slate-800 text-white p-4 rounded-lg mb-4 font-mono text-lg min-h-[60px] flex items-center">
            <span>
              {nextTokenScenario.slice(0, step + 1).map(s => s.token + " ")}
              {step === 3 && ". "}
              {step < 3 && <span className="animate-pulse border-b-2 border-indigo-400">?</span>}
            </span>
          </div>

          {step < 3 ? (
            <div className="space-y-2">
              <p className="text-xs text-slate-500 mb-2">다음에 올 가장 확률 높은 단어는?</p>
              {nextTokenScenario[step].prob.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => option.type === 'high' && setStep(step + 1)}
                  className={`w-full flex justify-between items-center p-3 rounded-lg text-sm transition-all ${
                    option.type === 'high' 
                      ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 font-bold' 
                      : 'bg-slate-50 text-slate-400 hover:bg-slate-100 border border-slate-100'
                  }`}
                >
                  <span>{option.text}</span>
                  <span className="text-xs bg-white px-2 py-1 rounded-full border">{option.p}%</span>
                </button>
              ))}
            </div>
          ) : (
             <div className="text-center py-4">
                <div className="text-green-600 font-bold mb-2">문장 완성!</div>
                <button 
                  onClick={() => setStep(0)}
                  className="text-sm text-indigo-500 hover:underline flex items-center justify-center gap-1 mx-auto"
                >
                  <RefreshCw className="w-3 h-3" /> 다시 하기
                </button>
             </div>
          )}
        </div>
      </div>

      {/* NEW: Capabilities & Limitations Table */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-4 text-center">프리트레이닝 단계의 능력표</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" /> 가능했던 것 (Capabilities)
            </h4>
            <ul className="space-y-2 text-sm text-green-800">
              <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 opacity-50"/> 유창한 문장 구사 (문법, 어휘력)</li>
              <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 opacity-50"/> 광범위한 일반 상식 답변</li>
              <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 opacity-50"/> 다양한 언어 번역 및 요약</li>
              <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 opacity-50"/> 문맥에 맞는 자연스러운 단어 선택</li>
            </ul>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
            <h4 className="font-bold text-orange-800 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> 한계점 (Limitations)
            </h4>
            <ul className="space-y-2 text-sm text-orange-800">
              <li className="flex items-start gap-2"><XCircle className="w-4 h-4 mt-0.5 opacity-50"/> <strong>사실 여부 검증 불가</strong> (그럴싸한 환각 발생)</li>
              <li className="flex items-start gap-2"><XCircle className="w-4 h-4 mt-0.5 opacity-50"/> 복잡한 논리/수학 문제 해결 실패</li>
              <li className="flex items-start gap-2"><XCircle className="w-4 h-4 mt-0.5 opacity-50"/> "모른다"고 하기보다 "아무 말"을 지어냄</li>
              <li className="flex items-start gap-2"><XCircle className="w-4 h-4 mt-0.5 opacity-50"/> 생각의 과정 없이 바로 답을 뱉음</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 mt-6 flex gap-4 items-center justify-center">
         <p className="text-sm text-indigo-800 font-medium flex items-center gap-2">
            <ArrowRight className="w-4 h-4" /> 
            그래서 우리는 이 한계를 극복하기 위해 <strong>RLVR(심화 학습)</strong>이 필요했습니다.
         </p>
      </div>
    </div>
  );
};

// 1. Concept Section
const ConceptSection = () => (
  <div className="space-y-8 animate-fadeIn">
    <div className="text-center mb-8">
      <h2 className="text-2xl font-bold text-indigo-900 mb-2">생각하는 힘 기르기: RLVR</h2>
      <p className="text-slate-500">기초 지식 위에 <span className="font-bold text-indigo-600">"논리"</span>와 <span className="font-bold text-indigo-600">"검증"</span>을 더하는 과정입니다.</p>
    </div>

    {/* Existing Comparison Cards */}
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      {/* Old Way */}
      <div className="border border-slate-200 rounded-xl p-6 bg-slate-50 relative overflow-hidden group hover:shadow-md transition-shadow">
        <div className="absolute top-0 right-0 bg-slate-200 text-slate-600 px-3 py-1 rounded-bl-lg text-sm font-bold">기존 (RLHF)</div>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gray-200 rounded-lg text-gray-600">
            <UserCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-700">글짓기 선생님</h3>
        </div>
        <ul className="space-y-3 text-sm text-slate-600">
          <li className="flex gap-2"><span className="text-red-500">✕</span> 사람이 "보기에 좋은지" 평가함</li>
          <li className="flex gap-2"><span className="text-red-500">✕</span> 주관적 기준, 그럴싸한 거짓말(환각) 발생</li>
          <li className="flex gap-2"><span className="text-red-500">✕</span> "결과"만 흉내 내는 것에 집중</li>
        </ul>
        <div className="mt-4 p-3 bg-white rounded-lg border border-slate-200 text-xs text-center text-slate-500 italic">
          "정답인지는 모르겠지만, 사람 말투랑 비슷하네? 합격!"
        </div>
      </div>

      {/* New Way */}
      <div className="border border-indigo-100 rounded-xl p-6 bg-indigo-50 relative overflow-hidden group hover:shadow-md transition-shadow">
        <div className="absolute top-0 right-0 bg-indigo-600 text-white px-3 py-1 rounded-bl-lg text-sm font-bold">최신 (RLVR)</div>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-indigo-600 rounded-lg text-white">
            <Brain className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-indigo-900">수학 선생님</h3>
        </div>
        <ul className="space-y-3 text-sm text-indigo-800">
          <li className="flex gap-2"><span className="text-green-600">✓</span> 정답이 "검증(Verify)" 가능한 문제를 풂</li>
          <li className="flex gap-2"><span className="text-green-600">✓</span> 스스로 생각하는 과정(Chain of Thought) 발달</li>
          <li className="flex gap-2"><span className="text-green-600">✓</span> "논리적 과정"을 스스로 깨우침 (On-policy)</li>
        </ul>
        <div className="mt-4 p-3 bg-white rounded-lg border border-indigo-200 text-xs text-center text-indigo-600 font-medium">
          "과정이 틀리면 정답도 틀려. 스스로 검증하고 논리적으로 풀어봐!"
        </div>
      </div>
    </div>

    {/* NEW: What became possible with RLVR */}
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-100 shadow-sm">
        <h3 className="text-lg font-bold text-indigo-900 mb-6 text-center flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600" /> 
          심화 단계(RLVR)를 통해 가능해진 것들
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
            <CapabilityCard 
                icon={<Brain className="w-5 h-5 text-indigo-600"/>}
                title="복잡한 추론 (Reasoning)"
                desc="단순 검색이 아닌, 여러 단계의 논리를 거쳐야만 풀 수 있는 수학, 코딩, 과학 문제를 해결할 수 있습니다."
            />
             <CapabilityCard 
                icon={<RefreshCw className="w-5 h-5 text-indigo-600"/>}
                title="오류 자가 수정 (Self-Correction)"
                desc="생각하다가 막히면 '잠깐, 이 방법은 틀린 것 같아'라고 되돌아가서 다시 푸는 능력이 생겼습니다."
            />
             <CapabilityCard 
                icon={<Target className="w-5 h-5 text-indigo-600"/>}
                title="의도 파악 및 검증"
                desc="사용자의 모호한 질문 속에서 진짜 의도를 파악하고, 자신의 답변이 근거가 있는지 스스로 검증합니다."
            />
        </div>
      </div>

    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mt-4">
      <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
        <Search className="w-4 h-4" />
        인사이트: 숨겨진 재능 깨우기
      </h4>
      <p className="text-sm text-blue-800">
        프리트레이닝 단계에서도 AI는 논리적으로 생각할 확률(약 1%)을 가지고 있었습니다. RLVR은 이 1%의 '성공적인 생각의 고리'를 찾아내 폭발적으로 칭찬해줌으로써, AI가 <strong>"찍지 않고 생각하는 습관"</strong>을 갖도록 훈련시킵니다.
      </p>
    </div>
  </div>
);

// Helper component for ConceptSection
const CapabilityCard = ({ icon, title, desc }) => (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-indigo-100 hover:shadow-md transition-shadow">
        <div className="mb-3 bg-indigo-50 w-10 h-10 flex items-center justify-center rounded-lg">{icon}</div>
        <h4 className="font-bold text-slate-800 text-sm mb-2">{title}</h4>
        <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
    </div>
);

// 2. Simulation Section
const SimulationSection = () => {
  const [mode, setMode] = useState('example'); // 'example' | 'live'

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-center mb-8">
        <div className="bg-slate-100 p-1 rounded-lg inline-flex">
          <button
            onClick={() => setMode('example')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${mode === 'example' ? 'bg-white shadow text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            기본 예시 보기
          </button>
          <button
            onClick={() => setMode('live')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${mode === 'live' ? 'bg-white shadow text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Sparkles className="w-3 h-3" />
            AI Live Lab
          </button>
        </div>
      </div>

      {mode === 'example' ? <ExampleSimulation /> : <LivePromptLab />}
    </div>
  );
};

const ExampleSimulation = () => {
  const [selectedPrompt, setSelectedPrompt] = useState(null); // 'bad' | 'good' | null
  const [selectedTaskType, setSelectedTaskType] = useState('planning'); // 'planning' | 'coding' | 'email' | 'writing'

  const taskTypes = [
    { id: 'planning', label: '기획/보고서', icon: <FileText className="w-4 h-4" /> },
    { id: 'coding', label: '코딩/개발', icon: <Code className="w-4 h-4" /> },
    { id: 'email', label: '이메일/응대', icon: <Mail className="w-4 h-4" /> },
    { id: 'writing', label: '창작/글쓰기', icon: <PenTool className="w-4 h-4" /> },
  ];

  const scenarioData = {
    planning: {
      bad: {
        title: "초보의 지시",
        prompt: "이 프로젝트 기획안 좀 써줘.",
        aiThought: "음.. 확률적으로 '기획안' 뒤에 자주 오는 목차(개요-본문-결론)를 흉내내자. 내용은 사실인지 모르겠지만 그럴싸한 비즈니스 용어를 섞으면 되겠지?",
        result: "겉모습은 번지르르하지만 실현 불가능하거나 논리적 비약이 심한 '알맹이 없는 기획안'.",
        critique: "구체적인 과정 없이 결과만 요구하면 AI는 '형식 채우기(암기 패턴)'에 급급해집니다."
      },
      good: {
        title: "고수의 지시",
        prompt: "기획안을 작성해 줘. 단, 1) 시장 현황 분석 2) 경쟁사 대비 차별점 3) 예상 리스크 및 대응 방안 순으로 논리를 전개하고, 각 주장에 대한 근거를 포함해 줘.",
        aiThought: "사용자가 논리적 전개 순서를 정해줬다. 1단계 시장 분석부터 팩트를 체크하며 생각하자. 근거가 없으면 다음 단계로 넘어가지 말자.",
        result: "논리적 근거가 탄탄하고, 실현 가능성이 높으며 구체적인 실행 방안이 담긴 '설득력 있는 기획안'.",
        critique: "AI에게 사고의 단계(Step-by-step)를 지정해주면 환각이 줄고 논리력이 비약적으로 상승합니다."
      }
    },
    coding: {
      bad: {
        title: "초보의 지시",
        prompt: "파이썬으로 웹 크롤러 만들어줘.",
        aiThought: "인터넷에 있는 크롤러 코드 아무거나 가져와야지. 사이트 구조가 바뀌었을 수도 있지만 일단 코드는 뱉고 보자.",
        result: "실행하면 바로 에러가 나거나, 예외 처리가 전혀 안 되어 있어 조금만 상황이 바뀌어도 멈추는 코드.",
        critique: "검증 기준이 없으면 AI는 '돌아가기만 하는(혹은 안 돌아가는)' 코드를 던져줍니다."
      },
      good: {
        title: "고수의 지시",
        prompt: "파이썬 웹 크롤러를 작성해 줘. 1) requests와 beautifulsoup을 사용하고, 2) 접속 에러 시 재시도 로직을 포함하고, 3) 결과는 CSV로 저장되는지 확인하는 테스트 코드도 같이 짜줘.",
        aiThought: "요구사항이 명확하다. 재시도 로직(Retry)과 CSV 저장, 테스트 케이스까지 고려해서 코드를 설계해야겠다.",
        result: "예외 처리가 꼼꼼하고, 실행 결과 검증까지 가능한 '견고하고 안전한 코드'.",
        critique: "구체적인 라이브러리, 예외 처리 조건, 검증(테스트) 방법을 명시하면 시니어 개발자급 코드를 얻을 수 있습니다."
      }
    },
    email: {
      bad: {
        title: "초보의 지시",
        prompt: "환불 거절 이메일 써줘.",
        aiThought: "환불 거절 데이터셋에서 가장 많이 본 패턴: '안 됩니다. 죄송합니다.' 그냥 딱딱하게 통보하자.",
        result: "고객의 기분을 상하게 할 수 있는 차갑고 기계적인 말투의 거절 메일.",
        critique: "톤앤매너나 맥락을 주지 않으면 AI는 가장 일반적이고 무미건조한 패턴을 선택합니다."
      },
      good: {
        title: "고수의 지시",
        prompt: "환불 거절 이메일을 써줘. 1) 먼저 고객의 불편에 공감하고, 2) 규정상 환불이 어려운 이유를 정중히 설명하고, 3) 대신 쿠폰을 제공하여 긍정적으로 마무리해 줘.",
        aiThought: "공감 -> 설명 -> 대안 제시 순서로 써야 한다. 무조건 안 된다고 하기보다 쿠폰이라는 보상을 줘서 마음을 돌려야지.",
        result: "고객의 마음을 헤아리면서도 회사의 입장을 명확히 전달하고, 재구매까지 유도하는 '세련된 이메일'.",
        critique: "감정적인 흐름과 대안까지 설계해주면 AI는 훌륭한 CS 담당자가 됩니다."
      }
    },
    writing: {
      bad: {
        title: "초보의 지시",
        prompt: "재미있는 SF 소설 써줘.",
        aiThought: "SF 소설? 우주선, 레이저, 외계인 나오면 되겠지. 줄거리는 뻔한 클리셰로 채우자.",
        result: "어디서 본 듯한 진부한 설정과 뻔한 결말로 끝나는 지루한 이야기.",
        critique: "추상적인 '재미'만 요구하면 AI는 학습 데이터에서 가장 흔한(진부한) 패턴을 가져옵니다."
      },
      good: {
        title: "고수의 지시",
        prompt: "SF 소설을 써줘. 배경은 물이 사라진 지구이고, 주인공은 마지막 물방울을 지키는 로봇이야. 결말은 희망적이기보다 비극적으로 끝내줘.",
        aiThought: "구체적인 설정이 잡혔다. 사막화된 지구 묘사부터 시작해서 로봇의 고독한 심리를 표현하고, 비극적 엔딩을 위해 복선을 깔아야겠다.",
        result: "독창적인 설정과 깊이 있는 묘사, 여운이 남는 결말을 가진 '임팩트 있는 스토리'.",
        critique: "소재, 배경, 분위기, 결말의 방향성을 구체적으로 줄수록 AI의 창의성이 빛을 발합니다."
      }
    }
  };

  const currentScenario = scenarioData[selectedTaskType];

  return (
    <div>
      <h2 className="text-2xl font-bold text-indigo-900 mb-6 text-center">어떤 업무를 시키시겠습니까?</h2>
      
      {/* Task Type Selector */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {taskTypes.map((task) => (
          <button
            key={task.id}
            onClick={() => {
              setSelectedTaskType(task.id);
              setSelectedPrompt(null); // Reset selection when type changes
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
              selectedTaskType === task.id
                ? 'bg-indigo-100 border-indigo-300 text-indigo-700 font-bold'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {task.icon}
            {task.label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <button 
          onClick={() => setSelectedPrompt('bad')}
          className={`p-5 rounded-xl border-2 text-left transition-all ${selectedPrompt === 'bad' ? 'border-red-400 bg-red-50 ring-2 ring-red-200' : 'border-slate-200 hover:border-red-200 hover:bg-slate-50'}`}
        >
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className={`w-5 h-5 ${selectedPrompt === 'bad' ? 'text-red-500' : 'text-slate-400'}`} />
            <h3 className="font-bold text-slate-700">단순 지시 (나쁜 예)</h3>
          </div>
          <p className="text-slate-600 bg-white p-3 rounded border border-slate-200 text-sm">
            "{currentScenario.bad.prompt}"
          </p>
        </button>

        <button 
          onClick={() => setSelectedPrompt('good')}
          className={`p-5 rounded-xl border-2 text-left transition-all ${selectedPrompt === 'good' ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200' : 'border-slate-200 hover:border-indigo-200 hover:bg-slate-50'}`}
        >
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className={`w-5 h-5 ${selectedPrompt === 'good' ? 'text-indigo-600' : 'text-slate-400'}`} />
            <h3 className="font-bold text-slate-700">구체적 지시 (좋은 예)</h3>
          </div>
          <p className="text-slate-600 bg-white p-3 rounded border border-slate-200 text-sm">
            "{currentScenario.good.prompt}"
          </p>
        </button>
      </div>

      {selectedPrompt && (
        <div className="bg-slate-800 text-white rounded-xl p-6 shadow-2xl animate-slideUp">
          <div className="flex items-center gap-2 mb-4 border-b border-slate-700 pb-3">
            <Brain className="w-5 h-5 text-purple-400" />
            <span className="font-bold text-purple-200">AI의 머릿속 (Simulation)</span>
          </div>
          
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Internal Monologue</span>
              <p className="text-slate-300 italic mt-1 text-sm leading-relaxed">
                "{currentScenario[selectedPrompt].aiThought}"
              </p>
            </div>

            <div className={`p-4 rounded-lg border ${selectedPrompt === 'good' ? 'bg-indigo-900/50 border-indigo-500/50' : 'bg-red-900/30 border-red-500/30'}`}>
              <span className="text-xs font-bold uppercase tracking-wider mb-1 block">
                최종 결과물
              </span>
              <p className="font-medium">
                {currentScenario[selectedPrompt].result}
              </p>
            </div>

            <div className="pt-2">
              <div className="flex items-start gap-2 bg-white/10 p-3 rounded-lg text-sm">
                <BookOpen className="w-4 h-4 mt-0.5 text-yellow-400 flex-shrink-0" />
                <span>{currentScenario[selectedPrompt].critique}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const LivePromptLab = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);

  const analyzeWithGemini = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const apiKey = ""; // Injected by environment
      const systemPrompt = `
        당신은 RLVR(Reinforcement Learning with Verifiable Rewards)과 Chain of Thought 원리를 가르치는 AI 프롬프트 엔지니어링 코치입니다.
        사용자가 입력한 프롬프트를 다음 기준으로 분석하세요:
        1. 모호성: AI가 혼란스러워할 부분이 있는가?
        2. 과정 요구: 결과를 도출하는 과정이나 단계를 명시했는가?
        3. 검증 가능성: AI가 스스로 잘했는지 평가할 기준(Reward)이 있는가?
        
        당신은 다음 JSON 스키마에 맞춰 응답해야 합니다:
        {
          "aiThought": "이 프롬프트를 받은 AI 모델의 솔직한 내면 독백 (1인칭 시점, 혼란스러우면 혼란스러움을 표현)",
          "score": 1부터 10까지의 점수 (숫자),
          "critique": "프롬프트에 대한 분석 및 평가 (한국어, 친절한 어조)",
          "improvedPrompt": "RLVR 원칙(과정, 분해, 검증)을 적용하여 개선한 프롬프트 예시"
        }
      `;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] },
            generationConfig: { responseMimeType: "application/json" }
          }),
        }
      );

      if (!response.ok) throw new Error('Gemini API call failed');

      const data = await response.json();
      const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (resultText) {
        setAnalysis(JSON.parse(resultText));
      }
    } catch (err) {
      setError("AI 분석 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-900 flex items-center justify-center gap-2">
          <Sparkles className="w-6 h-6 text-purple-500" />
          AI Live Lab
        </h2>
        <p className="text-slate-500">평소 사용하는 업무 지시를 입력하면 Gemini가 분석해드립니다.</p>
      </div>

      <div className="bg-white p-4 rounded-xl border border-indigo-100 shadow-sm">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="예: 이번주 주간 업무 보고서 초안 작성해줘."
          className="w-full h-32 p-4 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none resize-none text-slate-700 mb-3"
        />
        <div className="flex justify-end">
          <button
            onClick={analyzeWithGemini}
            disabled={loading || !prompt.trim()}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg disabled:opacity-50 transition-all"
          >
            {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            Gemini로 분석하기
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center text-sm">
          {error}
        </div>
      )}

      {analysis && (
        <div className="bg-slate-800 text-white rounded-xl p-6 shadow-2xl animate-slideUp space-y-6">
          
          {/* AI Internal Thought */}
          <div className="border-b border-slate-700 pb-4">
             <div className="flex items-center gap-2 mb-2">
              <Brain className="w-5 h-5 text-purple-400" />
              <span className="font-bold text-purple-200">AI의 속마음 (Internal Monologue)</span>
            </div>
            <p className="text-slate-300 italic leading-relaxed pl-7">
              "{analysis.aiThought}"
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Score & Critique */}
            <div className="bg-white/10 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-slate-200">RLVR 분석 점수</span>
                <span className={`text-2xl font-bold ${analysis.score >= 8 ? 'text-green-400' : analysis.score >= 5 ? 'text-yellow-400' : 'text-red-400'}`}>
                  {analysis.score}/10
                </span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {analysis.critique}
              </p>
            </div>

            {/* Improved Prompt */}
            <div className="bg-indigo-900/50 border border-indigo-500/30 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span className="font-bold text-indigo-200">이렇게 고쳐보세요</span>
              </div>
              <p className="text-sm text-indigo-100 whitespace-pre-wrap leading-relaxed">
                {analysis.improvedPrompt}
              </p>
              <button 
                onClick={() => {
                    navigator.clipboard.writeText(analysis.improvedPrompt);
                }}
                className="mt-3 text-xs flex items-center gap-1 text-indigo-400 hover:text-indigo-200 transition-colors"
              >
                <RefreshCw className="w-3 h-3" /> 복사하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 3. Checklist Section
const ChecklistSection = () => (
  <div className="animate-fadeIn space-y-6">
    <div className="text-center mb-6">
      <h2 className="text-2xl font-bold text-indigo-900">AI 활용을 위한 4가지 황금률</h2>
      <p className="text-slate-500">AI가 '풀 수 있는 문제'를 주는 것이 핵심입니다.</p>
    </div>

    <div className="grid gap-4">
      <CheckItem 
        num="1"
        title="과정(Process)을 요구하라"
        desc="단순히 '정답'만 묻지 말고, '어떤 단계를 거쳐야 하는지'를 먼저 물어보세요. Chain of Thought를 강제로 발동시키는 트리거가 됩니다."
      />
      <CheckItem 
        num="2"
        title="문제를 쪼개라 (Decomposition)"
        desc="AI는 한 번에 너무 복잡한 연산을 처리할 수 없습니다(Layer 한계). 거대한 업무를 AI가 한입에 먹을 수 있는 작은 'Sub-task'로 나눠서 주세요."
      />
      <CheckItem 
        num="3"
        title="채점 기준(Reward)을 함께 줘라"
        desc="'잘 쓴 글'이 무엇인지 기준을 주세요. '논리적 비약이 없는지 검사해', '테스트 케이스를 3개 만들어서 통과해' 같은 검증 가능한 조건을 줘야 합니다."
      />
      <CheckItem 
        num="4"
        title="생각할 시간을 존중하라"
        desc="최신 추론 모델은 답이 늦게 나올수록 내부에서 더 많은 시뮬레이션을 돌리고 있다는 뜻입니다. '천천히 단계별로 생각해(Think step-by-step)'라고 격려하세요."
      />
    </div>

    <div className="mt-8 p-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white text-center shadow-lg">
      <p className="font-bold text-lg mb-2">"당신은 AI의 사용자가 아니라, AI의 '사수'입니다."</p>
      <p className="text-indigo-100 text-sm">
        AI가 헤매지 않도록 업무의 지도(Process)와 나침반(Criteria)을 쥐여주세요.
      </p>
    </div>
  </div>
);

const CheckItem = ({ num, title, desc }) => (
  <div className="flex gap-4 p-4 bg-white border border-slate-200 rounded-xl hover:shadow-md transition-shadow items-start">
    <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">
      {num}
    </div>
    <div>
      <h3 className="font-bold text-slate-800 text-lg mb-1">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default AIManagementGuide;