const base = import.meta.env.BASE_URL.replace(/\/$/, '');

function getSourceCode(activeLine: number, endLine: number = activeLine) {
    const codeLines = [
        /* 1 */ `import { test, expect } from '@playwright/test';`,
        /* 2 */ `import { ProfilePage } from '../pages/ProfilePage';`,
        /* 3 */ ``,
        /* 4 */ `test('Candidate Validation: Sebastian Alatorre', async ({ page }) => {`,
        /* 5 */ `  // Instancia del Page Object Model (POM)`,
        /* 6 */ `  const profilePage = new ProfilePage(page);`,
        /* 7 */ ``,
        /* 8 */ `  // 1. Cargar el perfil`,
        /* 9 */ `  await profilePage.navigate();`,
        /* 10*/ ``,
        /* 11*/ `  // 2. Validar experiencia laboral`,
        /* 12*/ `  await profilePage.viewExperience();`,
        /* 13*/ ``,
        /* 14*/ `  // 3. Inspeccionar stack tecnológico`,
        /* 15*/ `  await profilePage.inspectTechStack();`,
        /* 16*/ ``,
        /* 17*/ `  // 4. Verificar educación y lenguajes`,
        /* 18*/ `  await profilePage.scrollToEducation();`,
        /* 19*/ ``,
        /* 20*/ `  // 5. Ver proyectos destacados`,
        /* 21*/ `  await profilePage.viewProjects();`,
        /* 22*/ ``,
        /* 23*/ `  // 6. Extraer y afirmar datos de contacto`,
        /* 24*/ `  const contact = await profilePage.getContactDetails();`,
        /* 25*/ `  expect(contact.email).toContain('uabc.edu.mx');`,
        /* 26*/ `});`
    ];

    let html = `<div class="font-mono text-[11px] leading-relaxed overflow-x-hidden text-zinc-300 pb-4 pt-2">`;
    codeLines.forEach((line, index) => {
        const lineNum = index + 1;
        const isHighlighted = lineNum >= activeLine && lineNum <= endLine;
        const rowClass = isHighlighted ? "bg-[#fffb00]/20 border-l-2 border-[#fffb00] text-white" : "border-l-2 border-transparent hover:bg-zinc-800/50";
        const numClass = isHighlighted ? "text-zinc-300" : "text-zinc-600";
        const formattedLine = line.replace(/ /g, '&nbsp;').replace('<', '&lt;').replace('>', '&gt;');
        html += `<div class="flex px-2 py-0.5 ${rowClass}"><span class="w-6 shrink-0 text-right mr-4 select-none ${numClass}">${lineNum}</span><span class="whitespace-pre flex-1">${formattedLine || '&nbsp;'}</span></div>`;
    });
    html += `</div>`;
    return html;
}

export const portfolioData = {
'btn-intro': {
        dom: `
            <div class="absolute -top-3.5 left-4 bg-zinc-800 px-3 py-1 rounded-full border border-zinc-700 text-xs text-blue-400 font-mono">
                url: /profile
            </div>
            
            <div class="flex flex-col md:flex-row gap-8 items-start mb-6">
                <div class="shrink-0 relative group">
                    <img 
                        data-pw-selector="getByRole('img', { name: 'Sebastian Alatorre Profile' })" 
                        src="${base}/Profilee.png" 
                        alt="Sebastian Alatorre" 
                        class="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-2 border-zinc-700 shadow-2xl transition-all duration-300 group-hover:border-blue-500"
                    />
                    <div class="absolute bottom-2 right-2 w-4 h-4 bg-[#45ad62] border-2 border-[#111] rounded-full" title="Open to work"></div>
                </div>

                <div class="flex flex-col justify-center">
                    <h1 data-pw-selector="getByRole('heading', { name: 'SEBASTIAN ALATORRE' })" class="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight uppercase">Sebastian Alatorre</h1>
                    <h2 data-pw-selector="locator('.candidate-role')" class="text-xl md:text-2xl font-mono candidate-role bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">>  SDET · QA Automation Engineer</h2>
                </div>
            </div>
            
            <div class="space-y-4 text-zinc-400 text-sm leading-relaxed border-l-2 border-zinc-800 pl-4 max-w-3xl">
                <p data-pw-selector="getByText('passionate about building reliable software')">Software Development Engineer in Test with a Computer Science degree and a genuine passion for software quality. I believe every bug caught early is a better experience delivered to the end user, and that drives everything I do.</p>
                <p data-pw-selector="getByText('Playwright, Cypress, Selenium, and K6')">My core toolkit includes Playwright, Cypress, Selenium, and K6 for performance testing, backed by solid CI/CD pipeline design to keep releases fast and safe across the entire development lifecycle.</p>
                <p data-pw-selector="getByText('end-to-end test automation strategies')">What sets me apart is a focus on end-to-end test automation strategies that bridge development and quality assurance, turning testing from a bottleneck into a competitive advantage.</p>
            </div>
        `,
        call: `<div class="text-blue-400 p-2 rounded border border-zinc-800 bg-black/20 font-mono whitespace-pre">await page.goto('/profile');<br/>await expect(page).toHaveTitle(/Sebastian/);</div>`,
        console: `<div class="text-white space-y-1"><span class="text-blue-400">[INFO]</span> Initializing candidate evaluation.<br/><span class="text-blue-400">[INFO]</span> Loading profile module...</div>`,
        network: `<div class="text-[#45ad62]">200 GET /api/profile/summary (12ms)</div><br/><div class="text-[#45ad62]">200 GET /profile.png (45ms)</div>`,
        source: getSourceCode(8, 9)
    },
    'btn-exp': {
        dom: `
            <h2 data-pw-selector="getByRole('heading', { name: 'EXPERIENCE' })" class="text-2xl font-bold text-white mb-6 uppercase">Experience</h2>
            
            <div data-pw-selector="locator('#experience-card')" id="experience-card" class="card-hover playwright-highlight p-5 border border-zinc-800 rounded bg-[#161616] relative">
                <div class="pw-action-point top-4 right-4"></div>
                <div class="flex justify-between items-start mb-4 border-b border-zinc-800 pb-3">
                    <div>
                        <h3 data-pw-selector="locator('.job-title')" class="text-lg font-bold text-white job-title">QA TESTER</h3>
                        <p data-pw-selector="getByText('Software Development Department at UABC')" class="text-blue-400 font-mono text-xs mt-1">Software Development Department at UABC</p>
                    </div>
                    <span data-pw-selector="getByText('02/2023 - Present')" class="text-zinc-500 text-xs bg-zinc-800 px-2 py-1 rounded font-mono">02/2023 - Present</span>
                </div>
                
                <ul class="text-zinc-400 text-sm space-y-3 list-none">
                    <li data-pw-selector="locator('li').filter({ hasText: 'Develop and execute test scripts' })" class="flex gap-2"><span class="text-blue-500">▶</span> <span>Develop and execute test scripts using <b>Selenium</b>, <b>Cypress</b>, and <b>Playwright</b> (POM pattern).</span></li>
                    <li data-pw-selector="locator('li').filter({ hasText: 'Collaborate with developers' })" class="flex gap-2"><span class="text-blue-500">▶</span> <span>Collaborate with developers to align testing with project requirements.</span></li>
                    <li data-pw-selector="locator('li').filter({ hasText: 'Perform functional and performance testing' })" class="flex gap-2"><span class="text-blue-500">▶</span> <span>Perform functional and performance testing with tools like <b>K6</b>.</span></li>
                    <li data-pw-selector="locator('li').filter({ hasText: 'Design CI/CD pipelines' })" class="flex gap-2"><span class="text-blue-500">▶</span> <span>Design <b>CI/CD pipelines</b> to automate testing.</span></li>
                    <li data-pw-selector="locator('li').filter({ hasText: 'Document findings' })" class="flex gap-2"><span class="text-blue-500">▶</span> <span>Document findings, report bugs, and ensure product quality.</span></li>
                    <li data-pw-selector="locator('li').filter({ hasText: 'Designed effective tests based on project requirements' })" class="flex gap-2"><span class="text-blue-500">▶</span> <span>Designed effective tests based on project requirements.</span></li>
                </ul>
            </div>
        `,
        call: `<div class="text-green-400 p-2 rounded border border-zinc-800 bg-black/20 font-mono whitespace-pre">await page.locator('#experience').click();<br/>await expect(page.locator('.job-title')).toHaveText('QA TESTER');</div>`,
        console: `<div class="text-white"><span class="text-yellow-400">[WARN]</span> Strict mode violation? Found highly efficient test scripts. Proceeding.</div>`,
        network: `<div class="text-[#45ad62]">200 GET /assets/uabc-logo.png (45ms)</div>`,
        source: getSourceCode(11, 12)
    },
    'btn-skills': {
        dom: `
            <div class="absolute -top-3.5 left-4 bg-zinc-800 px-3 py-1 rounded-full border border-zinc-700 text-xs text-blue-400 font-mono">
                locator('.tech-stack')
            </div>
            
            <div class="playwright-highlight grid grid-cols-2 gap-6 p-5 bg-[#161616] rounded border border-zinc-800">
            <div class="pw-action-point -top-1.5 left-1/2 transform -translate-x-1/2"></div>
                <div class="space-y-4">
                    <h3 data-pw-selector="getByText('TECHNICAL SKILLS')" class="text-white border-b border-zinc-800 pb-2 font-mono text-xs uppercase tracking-wider">Technical Skills</h3>
                    
                    <div class="space-y-4">
                        <div>
                            <span class="text-[10px] uppercase font-bold text-[#45ad62] tracking-wider mb-1.5 block">Testing Frameworks</span>
                            <div class="flex flex-wrap gap-2">
                                <span data-pw-selector="getByText('PLAYWRIGHT', { exact: true })" class="skill-badge-hover px-3 py-1.5 bg-[#45ad62]/20 border border-[#45ad62]/60 rounded text-sm text-[#45ad62] font-bold flex items-center gap-1.5"><svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"><path d="m72.086 86.132-.594-.144c-13.125-3.844-15.15-14.311-15.15-14.311l18.182 5.082L84.15 39.77l-.116-.031c-11.807-3.162-19.64-8.692-22.744-11.292-4.4-3.685-6.335-6.246-8.24-2.372-1.682 3.417-3.836 8.977-5.92 16.762-4.516 16.857-7.892 52.429 20.027 59.914l.572.129zm-18.807-30.85s4.4-6.843 11.862-4.722c7.467 2.121 8.045 10.376 8.045 10.376zm-8.517 23.451L31.787 82.41s1.41-8.029 10.968-11.212l-7.347-27.573-.635.193c-9.111 2.457-16.476 1.805-19.55 1.273-4.357-.751-6.636-1.708-6.422 1.606.186 2.923.882 7.454 2.477 13.44 3.45 12.961 14.854 37.937 36.405 32.132l.635-.199-3.555-13.337ZM19.548 60.315l15.316-4.035s-.446 5.892-6.188 7.405c-5.743 1.512-9.128-3.371-9.128-3.371zm89.824-18.979c-3.981.698-13.532 1.567-25.336-1.596-11.807-3.162-19.64-8.692-22.744-11.292-4.4-3.685-6.335-6.246-8.24-2.372-1.684 3.417-3.837 8.977-5.921 16.762-4.516 16.857-7.892 52.429 20.027 59.914 27.912 7.479 42.772-25.017 47.289-41.875 2.084-7.783 2.998-13.676 3.25-17.476.287-4.305-2.67-3.055-8.324-2.064zM53.28 55.282s4.4-6.843 11.862-4.722c7.467 2.121 8.045 10.376 8.045 10.376zm18.215 30.706c-13.125-3.845-15.15-14.311-15.15-14.311l35.259 9.858c0-.002-7.117 8.25-20.109 4.453zm12.466-21.51s4.394-6.838 11.854-4.711c7.46 2.124 8.048 10.379 8.048 10.379z"/></svg>PLAYWRIGHT</span>
                                <span data-pw-selector="getByText('CYPRESS', { exact: true })" class="skill-badge-hover px-3 py-1.5 bg-[#45ad62]/20 border border-[#45ad62]/60 rounded text-sm text-[#45ad62] font-bold flex items-center gap-1.5"><svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M11.998.0195c-.8642 0-1.6816.1101-2.1445.1934v.002C4.1731 1.2283 0 6.1368 0 12.0018c0 1.1265.1573 2.2328.4648 3.3028.0387.1453.0915.2993.1368.4473 1.607 4.865 6.2245 8.226 11.3925 8.2285.0651 0 .2518-.0003.502-.0118.8564-.0353 1.6228-.5734 1.9512-1.369l.4736-1.1544L20.4258 8.043H18.621l-2.3164 5.871-2.334-5.871h-1.9082l3.2734 8.0117c-.8115 1.9702-1.6252 3.9395-2.4355 5.9101-.0808.1945-.2655.3284-.4727.336-.144.005-.285.0098-.4316.0098-4.5848 0-8.6672-3.0695-9.9277-7.4649a10.3058 10.3058 0 0 1-.3985-2.8437c0-5.0887 3.6521-9.3404 8.6035-10.164.2214-.037.8885-.1446 1.7246-.1446 4.4166 0 8.269 2.732 9.7305 6.8476.0558.144.0977.293.1465.4395.299.9746.4531 1.9887.4531 3.0215 0 4.5696-2.9413 8.5326-7.3164 9.8613l.4863 1.5996c5.085-1.546 8.4995-6.1518 8.502-11.459 0-1.5491-.2983-2.8706-.6504-3.8926-.0432-.1212-.0873-.2422-.1309-.3633h-.002C21.4577 3.0954 17.0444.0195 11.998.0195ZM8.4336 7.8906c-1.1999 0-2.1747.3852-2.9805 1.1758-.8007.7856-1.205 1.7736-1.205 2.9356 0 1.1544.4068 2.1368 1.205 2.9199.8058.7906 1.7806 1.1738 2.9805 1.1738 1.705 0 3.1556-.955 3.7871-2.4883l.0332-.082-1.6289-.5547c-.168.4563-.7552 1.4883-2.1914 1.4883-.6745 0-1.2437-.2344-1.6934-.6992-.4572-.4699-.6875-1.0632-.6875-1.7578 0-.6998.2253-1.2809.6875-1.7735.4522-.4648 1.019-.7012 1.6934-.7012 1.438 0 2.0238 1.0815 2.1934 1.4883l1.627-.5527-.0333-.084c-.629-1.5358-2.082-2.4883-3.7871-2.4883Z"/></svg>CYPRESS</span>
                                <span data-pw-selector="getByText('SELENIUM', { exact: true })" class="skill-badge-hover px-3 py-1.5 bg-[#45ad62]/20 border border-[#45ad62]/60 rounded text-sm text-[#45ad62] font-bold flex items-center gap-1.5"><svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M23.174 3.468l-7.416 8.322a.228.228 0 0 1-.33 0l-3.786-3.9a.228.228 0 0 1 0-.282L12.872 6a.228.228 0 0 1 .366 0l2.106 2.346a.228.228 0 0 0 .342 0l5.94-8.094A.162.162 0 0 0 21.5 0H.716a.174.174 0 0 0-.174.174v23.652A.174.174 0 0 0 .716 24h22.566a.174.174 0 0 0 .174-.174V3.6a.162.162 0 0 0-.282-.132zM6.932 21.366a5.706 5.706 0 0 1-4.05-1.44.222.222 0 0 1 0-.288l.882-1.236a.222.222 0 0 1 .33-.036 4.338 4.338 0 0 0 2.964 1.158c1.158 0 1.722-.534 1.722-1.098 0-1.752-5.7-.552-5.7-4.278 0-1.65 1.428-3 3.756-3a5.568 5.568 0 0 1 3.708 1.242.222.222 0 0 1 0 .3l-.906 1.2a.222.222 0 0 1-.318.036 4.29 4.29 0 0 0-2.706-.936c-.906 0-1.41.402-1.41.996 0 1.572 5.688.522 5.688 4.2.006 1.812-1.284 3.18-3.96 3.18zm12.438-3.432a.192.192 0 0 1-.192.192h-5.202a.06.06 0 0 0-.06.066 1.986 1.986 0 0 0 2.106 1.638 3.264 3.264 0 0 0 1.8-.6.192.192 0 0 1 .276.042l.636.93a.198.198 0 0 1-.042.264 4.71 4.71 0 0 1-2.892.9 3.726 3.726 0 0 1-3.93-3.87 3.744 3.744 0 0 1 3.81-3.852c2.196 0 3.684 1.644 3.684 4.05zm-3.684-2.748a1.758 1.758 0 0 0-1.8 1.56.06.06 0 0 0 .06.066h3.492a.06.06 0 0 0 .06-.066 1.698 1.698 0 0 0-1.812-1.56Z"/></svg>SELENIUM</span>
                                <span data-pw-selector="getByText('K6', { exact: true })" class="skill-badge-hover px-3 py-1.5 bg-[#45ad62]/20 border border-[#45ad62]/60 rounded text-sm text-[#45ad62] font-bold flex items-center gap-1.5"><svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M24 23.646H0L7.99 6.603l4.813 3.538L19.08.354Zm-8.8-3.681h.052a2.292 2.292 0 0 0 1.593-.64 2.088 2.088 0 0 0 .685-1.576 1.912 1.912 0 0 0-.66-1.511 2.008 2.008 0 0 0-1.37-.59h-.04a.716.716 0 0 0-.199.027l1.267-1.883-1.01-.705-.477.705-1.22 1.864c-.21.31-.386.582-.495.77-.112.2-.21.41-.29.625a1.942 1.942 0 0 0-.138.719 2.086 2.086 0 0 0 .676 1.558c.422.411.989.641 1.578.64Zm-5.365-2.027 1.398 1.978h1.496l-1.645-2.295 1.46-2.029-.97-.671-.427.565-1.314 1.853v-3.725l-1.31-1.068v7.37h1.31v-1.98Zm5.367.792a.963.963 0 1 1 0-1.927h.009a.941.941 0 0 1 .679.29.897.897 0 0 1 .29.668.978.978 0 0 1-.977.967Z"/></svg>K6</span>
                            </div>
                        </div>

                        <div>
                            <span class="text-[10px] uppercase font-bold text-[#a78bfa] tracking-wider mb-1.5 block">Programming Languages</span>
                            <div class="flex flex-wrap gap-2">
                                <span data-pw-selector="getByText('TYPESCRIPT', { exact: true })" class="skill-badge-hover px-2 py-1 bg-[#a78bfa]/10 border border-[#a78bfa]/30 rounded text-xs text-[#a78bfa]">TYPESCRIPT</span>
                                <span data-pw-selector="getByText('JAVASCRIPT', { exact: true })" class="skill-badge-hover px-2 py-1 bg-[#a78bfa]/10 border border-[#a78bfa]/30 rounded text-xs text-[#a78bfa]">JAVASCRIPT</span>
                                <span data-pw-selector="getByText('JAVA', { exact: true })" class="skill-badge-hover px-2 py-1 bg-[#a78bfa]/10 border border-[#a78bfa]/30 rounded text-xs text-[#a78bfa]">JAVA</span>
                                <span data-pw-selector="getByText('PYTHON', { exact: true })" class="skill-badge-hover px-2 py-1 bg-[#a78bfa]/10 border border-[#a78bfa]/30 rounded text-xs text-[#a78bfa]">PYTHON</span>
                            </div>
                        </div>

                        <div>
                            <span class="text-[10px] uppercase font-bold text-[#fbbf24] tracking-wider mb-1.5 block">Tools & Practices</span>
                            <div class="flex flex-wrap gap-2">
                                <span data-pw-selector="getByText('API TESTING', { exact: true })" class="skill-badge-hover px-2 py-1 bg-[#fbbf24]/10 border border-[#fbbf24]/30 rounded text-xs text-[#fbbf24]">API TESTING</span>
                                <span data-pw-selector="getByText('GIT', { exact: true })" class="skill-badge-hover px-2 py-1 bg-[#fbbf24]/10 border border-[#fbbf24]/30 rounded text-xs text-[#fbbf24]">GIT</span>
                                <span data-pw-selector="getByText('JIRA', { exact: true })" class="skill-badge-hover px-2 py-1 bg-[#fbbf24]/10 border border-[#fbbf24]/30 rounded text-xs text-[#fbbf24]">JIRA</span>
                                <span data-pw-selector="getByText('CI/CD PIPELINES', { exact: true })" class="skill-badge-hover px-2 py-1 bg-[#fbbf24]/10 border border-[#fbbf24]/30 rounded text-xs text-[#fbbf24]">CI/CD PIPELINES</span>
                                <span data-pw-selector="getByText('SQL QUERIES', { exact: true })" class="skill-badge-hover px-2 py-1 bg-[#fbbf24]/10 border border-[#fbbf24]/30 rounded text-xs text-[#fbbf24]">SQL QUERIES</span>
                                <span data-pw-selector="getByText('MANTISBT', { exact: true })" class="skill-badge-hover px-2 py-1 bg-[#fbbf24]/10 border border-[#fbbf24]/30 rounded text-xs text-[#fbbf24]">MANTISBT</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="space-y-4 border-l border-zinc-800 pl-6">
                    <h3 data-pw-selector="getByText('SOFT SKILLS')" class="text-white border-b border-zinc-800 pb-2 font-mono text-xs uppercase tracking-wider">Soft Skills</h3>
                    <ul class="text-zinc-400 text-xs space-y-2 list-none">
                        <li data-pw-selector="locator('li:has-text(\\'AGILE METHODOLOGY\\')')" class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span> AGILE METHODOLOGY</li>
                        <li data-pw-selector="locator('li:has-text(\\'Attention to Detail\\')')" class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Attention to Detail</li>
                        <li data-pw-selector="locator('li:has-text(\\'Communication Skills\\')')" class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Communication Skills</li>
                        <li data-pw-selector="locator('li:has-text(\\'Team Collaboration\\')')" class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Team Collaboration</li>
                        <li data-pw-selector="locator('li:has-text(\\'Adaptability\\')')" class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Adaptability</li>
                        <li data-pw-selector="locator('li:has-text(\\'Curiosity and Learning\\')')" class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Curiosity and Learning</li>
                        <li data-pw-selector="locator('li:has-text(\\'User Experience Focus\\')')" class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span> User Experience Focus</li>
                        <li data-pw-selector="locator('li:has-text(\\'Detailed Reporting\\')')" class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Detailed Reporting</li>
                    </ul>
                </div>
            </div>
        `,
        call: `<div class="text-green-400 p-2 rounded border border-zinc-800 bg-black/20 font-mono whitespace-pre">await page.locator('.tech-stack').hover();<br/>await expect(page.getByText('PLAYWRIGHT')).toBeVisible();</div>`,
        console: `<div class="text-zinc-500">Checking element intersection...</div><div class="text-[#45ad62]">Element is stable and ready for interaction.</div>`,
        network: `<div class="text-[#45ad62]">200 GET /api/skills (8ms)</div>`,
        source: getSourceCode(14, 15)
    },
    'btn-edu': {
        dom: `
            <div class="grid grid-cols-2 gap-6">
                <div>
                    <h2 data-pw-selector="getByRole('heading', { name: 'EDUCATION' })" class="text-xl font-bold text-white mb-4 uppercase">Education</h2>
                    <div data-pw-selector="locator('#education-card')" id="education-card" class="card-hover playwright-highlight p-5 border border-zinc-800 rounded bg-[#161616]">
                        <span data-pw-selector="getByText('2024')" class="text-blue-500 font-mono text-xs font-bold block mb-1">2024</span>
                        <h3 data-pw-selector="getByText('B.Sc. in Computer Science')" class="text-md font-bold text-white">B.Sc. in Computer Science</h3>
                        <p data-pw-selector="getByText('Universidad Autónoma de Baja California')" class="text-zinc-400 text-xs mt-2">Universidad Autónoma de Baja California</p>
                    </div>
                </div>

                <div>
                    <h2 data-pw-selector="getByRole('heading', { name: 'LANGUAGES' })" class="text-xl font-bold text-white mb-4 uppercase">Languages</h2>
                    <div class="space-y-3">
                        <div data-pw-selector="locator('.lang-es')" class="card-hover lang-es p-4 border border-zinc-800 rounded bg-[#1a1a1a] flex items-center justify-between transition-colors hover:border-zinc-600">
                            <span class="text-white text-sm font-medium">Spanish</span>
                            <span class="text-[#45ad62] text-xs font-mono bg-[#45ad62]/10 border border-[#45ad62]/20 px-2 py-1 rounded">Native</span>
                        </div>
                        <div data-pw-selector="locator('.lang-en')" class="card-hover lang-en p-4 border border-zinc-800 rounded bg-[#1a1a1a] flex items-center justify-between transition-colors hover:border-zinc-600">
                            <span class="text-white text-sm font-medium">English</span>
                            <span class="text-blue-400 text-xs font-mono bg-blue-400/10 border border-blue-400/20 px-2 py-1 rounded text-right">Intermediate to Advanced<br/>(C1 CEFR)</span>
                        </div>
                    </div>
                </div>
            </div>
        `,
        call: `<div class="text-yellow-400 p-2 rounded border border-zinc-800 bg-black/20 font-mono">await page.locator('#education').scrollIntoViewIfNeeded();</div>`,
        console: `<div class="text-white">Scrolling into view... Done.</div>`,
        network: `<div class="text-[#45ad62]">200 GET /fonts/Inter-Regular.woff2 (from cache)</div>`,
        source: getSourceCode(17, 18)
    },
    'btn-projects': {
        dom: `
            <div class="flex flex-col items-center justify-center h-full space-y-6">
                
                <h2 data-pw-selector="getByRole('heading', { name: 'PROJECTS' })" class="text-2xl font-bold text-white uppercase tracking-widest border-b border-zinc-800 pb-2">Projects</h2>
                
                <div data-pw-selector="locator('#projects-card')" id="projects-card" class="playwright-highlight flex flex-col items-center space-y-4 p-8 w-full max-w-md bg-[#161616] border border-zinc-800 rounded shadow-2xl">
                    <div class="text-5xl mb-2">🚧</div>
                    <p data-pw-selector="getByText('Featured projects coming soon')" class="text-zinc-400 text-sm text-center font-mono">Featured projects coming soon.</p>
                    <p class="text-zinc-500 text-xs text-center">This section will be updated with real projects in a future iteration.</p>
                </div>
            </div>
        `,
        call: `<div class="text-green-400 p-2 rounded border border-zinc-800 bg-black/20 font-mono whitespace-pre">await page.locator('#projects').click();<br/>await expect(page.locator('#projects-card')).toBeVisible();</div>`,
        console: `<div class="text-white"><span class="text-blue-400">[INFO]</span> Loading projects section... Placeholder active.</div>`,
        network: `<div class="text-zinc-500">No network requests recorded.</div>`,
        source: getSourceCode(20, 21)
    },
    'btn-contact': {
        dom: `
            <div class="flex flex-col items-center justify-center h-full space-y-6">
                
                <h2 data-pw-selector="getByRole('heading', { name: 'CONTACT INFORMATION' })" class="text-2xl font-bold text-white uppercase tracking-widest border-b border-zinc-800 pb-2">Contact Information</h2>
                
                <div data-pw-selector="locator('#contact-card')" id="contact-card" class="playwright-highlight flex flex-col items-center space-y-4 p-8 w-full max-w-md bg-[#161616] border border-zinc-800 rounded shadow-2xl">
                    
                    <div class="w-full space-y-4">
                        <div data-pw-selector="locator('.contact-item').nth(0)" class="card-hover flex items-center gap-4 bg-black/30 p-3 rounded border border-zinc-800/50 hover:border-blue-500/50 transition-colors cursor-crosshair">
                            <span class="text-blue-500 text-xl w-6 text-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="20" height="20"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg></span>
                            <div>
                                <p class="text-zinc-500 text-[10px] uppercase font-bold">Location</p>
                                <p class="text-zinc-200 text-sm">Ensenada, Baja California, Mexico</p>
                            </div>
                        </div>

                        <div data-pw-selector="locator('.contact-item').nth(1)" class="card-hover flex items-center gap-4 bg-black/30 p-3 rounded border border-zinc-800/50 hover:border-blue-500/50 transition-colors cursor-crosshair">
                            <span class="text-blue-500 text-xl w-6 text-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="20" height="20"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg></span>
                            <div>
                                <p class="text-zinc-500 text-[10px] uppercase font-bold">Phone</p>
                                <p class="text-zinc-200 text-sm font-mono">+52-646-1979390</p>
                            </div>
                        </div>

                        <div data-pw-selector="locator('.contact-item').nth(2)" class="card-hover flex items-center gap-4 bg-black/30 p-3 rounded border border-zinc-800/50 hover:border-blue-500/50 transition-colors cursor-crosshair">
                            <span class="text-blue-500 text-xl w-6 text-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="20" height="20"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg></span>
                            <div>
                                <p class="text-zinc-500 text-[10px] uppercase font-bold">Email</p>
                                <a href="mailto:alatorre.sebastian@uabc.edu.mx" class="text-blue-400 text-sm hover:underline">alatorre.sebastian@uabc.edu.mx</a>
                            </div>
                        </div>
                    </div>

                    <div class="flex gap-4 w-full mt-4 pt-4 border-t border-zinc-800">
                        <a href="https://github.com/SebastianAlatworr" target="_blank" rel="noopener noreferrer" data-pw-selector="getByRole('link', { name: 'GitHub' })" class="flex-1 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold rounded transition-colors border border-zinc-600 flex justify-center items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                            GitHub
                        </a>
                        <a href="https://www.linkedin.com/in/sebastian-alatorre" target="_blank" rel="noopener noreferrer" data-pw-selector="getByRole('link', { name: 'LinkedIn' })" class="flex-1 py-2 bg-[#0077b5]/20 hover:bg-[#0077b5]/40 text-white text-xs font-bold rounded transition-colors border border-[#0077b5]/50 flex justify-center items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                            LinkedIn
                        </a>
                    </div>

                </div>
            </div>
        `,
        call: `<div class="text-blue-400 p-2 rounded border border-zinc-800 bg-black/20 font-mono whitespace-pre">const contact = await page.evaluate(() => {\n  return getContactInfo();\n});<br/>console.log(contact);</div>`,
        console: `<div class="text-white space-y-1"><span class="text-blue-400">Object {</span><br/>&nbsp;&nbsp;email: "alatorre.sebastian@uabc.edu.mx",<br/>&nbsp;&nbsp;phone: "+52-646-1979390",<br/>&nbsp;&nbsp;location: "Ensenada, BC"<br/><span class="text-blue-400">}</span></div>`,
        network: `<div class="text-zinc-500">No network requests recorded.</div>`,
        source: getSourceCode(23, 25)
    },
    'btn-legacy': {
        dom: `
            <div class="flex flex-col items-center justify-center h-full space-y-4">
                <h2 data-pw-selector="getByRole('heading', { name: '500 - Internal Server Error' })" class="text-2xl font-bold text-red-500 font-mono">500 - Internal Server Error</h2>
                <div data-pw-selector="locator('.error-container')" class="p-6 border border-red-900 bg-red-950/30 rounded w-full max-w-md">
                    <p data-pw-selector="getByText('Legacy Authentication Module failed to load')" class="text-zinc-300 font-mono text-sm mb-4 text-center">Legacy Authentication Module failed to load.</p>
                    <div class="animate-pulse bg-red-900/50 h-8 w-full rounded flex items-center justify-center text-red-200 text-xs font-mono border border-red-700">
                        [ SYSTEM OFFLINE ]
                    </div>
                </div>
            </div>
        `,
        call: `
            <div class="text-red-400 p-2 rounded border border-red-900 bg-red-950/20 font-mono whitespace-pre">await page.locator('.login-btn').click({ timeout: 5000 });</div>
            <div class="text-red-500 mt-2 font-mono text-[10px] whitespace-pre-wrap">
TimeoutError: locator('.login-btn') is not visible
Call log:
  - waiting for locator('.login-btn')
  -   locator resolved to hidden &lt;button class="login-btn" disabled&gt;Login&lt;/button&gt;
  - attempting click action
  -   waiting for element to be visible, enabled and stable
  -   element is not enabled - waiting...
            </div>
        `,
        console: `<div class="text-red-400 space-y-1 font-mono">
            <span class="font-bold">Uncaught (in promise) Error:</span> Component Initialization Failed<br/>
            &nbsp;&nbsp;at legacy-auth.js:142:9<br/>
            &nbsp;&nbsp;at Module.load (core.js:88)
        </div>`,
        network: `<div class="text-red-400 font-mono">500 GET /api/v1/legacy/auth-status (5001ms) - <span class="text-zinc-500">Timeout</span></div>`,
        source: `
            <div class="font-mono text-[11px] leading-relaxed overflow-x-auto text-zinc-300 pb-4 pt-2">
                <div class="flex px-2 py-0.5 border-l-2 border-transparent hover:bg-zinc-800/50">
                    <span class="w-6 shrink-0 text-right mr-4 select-none text-zinc-600">1</span>
                    <span class="whitespace-pre flex-1">import { test, expect } from '@playwright/test';</span>
                </div>
                <div class="flex px-2 py-0.5 border-l-2 border-transparent hover:bg-zinc-800/50">
                    <span class="w-6 shrink-0 text-right mr-4 select-none text-zinc-600">2</span>
                    <span class="whitespace-pre flex-1"></span>
                </div>
                <div class="flex px-2 py-0.5 border-l-2 border-transparent hover:bg-zinc-800/50">
                    <span class="w-6 shrink-0 text-right mr-4 select-none text-zinc-600">3</span>
                    <span class="whitespace-pre flex-1">test('Legacy system validation', async ({ page }) => {</span>
                </div>
                <div class="flex px-2 py-0.5 border-l-2 border-transparent hover:bg-zinc-800/50">
                    <span class="w-6 shrink-0 text-right mr-4 select-none text-zinc-600">4</span>
                    <span class="whitespace-pre flex-1">&nbsp;&nbsp;await page.goto('/legacy-portal');</span>
                </div>
                <div class="flex px-2 py-0.5 bg-[#fffb00]/20 border-l-2 border-red-500 text-white">
                    <span class="w-6 shrink-0 text-right mr-4 select-none text-red-400">5</span>
                    <span class="whitespace-pre flex-1">&nbsp;&nbsp;<span class="text-red-400 underline decoration-red-500 decoration-wavy">await page.locator('.login-btn').click({ timeout: 5000 });</span></span>
                </div>
                <div class="flex px-2 py-0.5 border-l-2 border-transparent hover:bg-zinc-800/50">
                    <span class="w-6 shrink-0 text-right mr-4 select-none text-zinc-600">6</span>
                    <span class="whitespace-pre flex-1">&nbsp;&nbsp;await expect(page.locator('.dashboard')).toBeVisible();</span>
                </div>
                <div class="flex px-2 py-0.5 border-l-2 border-transparent hover:bg-zinc-800/50">
                    <span class="w-6 shrink-0 text-right mr-4 select-none text-zinc-600">7</span>
                    <span class="whitespace-pre flex-1">});</span>
                </div>
            </div>
        `
    }
};