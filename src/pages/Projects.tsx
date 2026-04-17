import { useState } from 'react';
import { MapPin, Calendar, Building2, TrendingDown, TrendingUp, Download, Filter } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const projects = [
  {
    id: 1,
    name: '台北金融大樓',
    location: '台北市信義區',
    type: '商業大樓',
    year: '2024',
    status: '進行中',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&q=80',
    stats: [
      { label: '工期縮短', value: '45%', trend: 'down' },
      { label: '成本節省', value: '32%', trend: 'down' },
      { label: '碳減排', value: '38%', trend: 'down' },
    ],
    description: '採用磐石爬升模板系統，實現超高層建築的快速施工與精準控制。AI 監測系統即時追蹤結構狀態，確保施工安全。',
    solutions: ['爬升模板', '牆體模板'],
    area: '120,000 m²',
    floors: 45,
  },
  {
    id: 2,
    name: '台中智慧園區',
    location: '台中市西屯區',
    type: '科技園區',
    year: '2024',
    status: '已完成',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop&q=80',
    stats: [
      { label: '工期縮短', value: '38%', trend: 'down' },
      { label: '成本節省', value: '28%', trend: 'down' },
      { label: '重複使用率', value: '180+', trend: 'up' },
    ],
    description: '大規模園區開發，模板系統的高重複使用率大幅降低總體成本。RFID 追蹤系統實現全園區模板資產管理。',
    solutions: ['牆體模板', '樓板模板'],
    area: '80,000 m²',
    floors: 12,
  },
  {
    id: 3,
    name: '高雄綠建築住宅',
    location: '高雄市鼓山區',
    type: '住宅大樓',
    year: '2023',
    status: '已完成',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop&q=80',
    stats: [
      { label: '工期縮短', value: '42%', trend: 'down' },
      { label: '碳減排', value: '45%', trend: 'down' },
      { label: '綠建築認證', value: '鑽石級', trend: 'up' },
    ],
    description: '全台首座鑽石級綠建築認證住宅，ESG 表現卓越。碳足跡追蹤系統完整記錄施工過程的環境影響。',
    solutions: ['牆體模板', '樓板模板'],
    area: '45,000 m²',
    floors: 25,
  },
  {
    id: 4,
    name: '桃園國際機場第三航廈',
    location: '桃園市大園區',
    type: '公共工程',
    year: '2023',
    status: '進行中',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop&q=80',
    stats: [
      { label: '工期縮短', value: '35%', trend: 'down' },
      { label: '精準度', value: '99.7%', trend: 'up' },
      { label: '安全事故', value: '0', trend: 'down' },
    ],
    description: '國家門戶工程，採用最高標準的模板系統與監測技術。24/7 全天候施工監控確保品質與安全。',
    solutions: ['特殊結構', '牆體模板'],
    area: '200,000 m²',
    floors: 5,
  },
  {
    id: 5,
    name: '新竹科學園區擴建',
    location: '新竹市東區',
    type: '工業廠房',
    year: '2023',
    status: '已完成',
    image: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&h=600&fit=crop&q=80',
    stats: [
      { label: '工期縮短', value: '40%', trend: 'down' },
      { label: '成本節省', value: '30%', trend: 'down' },
      { label: '設備稼動', value: '95%', trend: 'up' },
    ],
    description: '半導體廠房擴建工程，對精度與潔淨度要求極高。磐石系統的模組化設計完美滿足需求。',
    solutions: ['樓板模板', '特殊結構'],
    area: '60,000 m²',
    floors: 3,
  },
  {
    id: 6,
    name: '台南文化創意園區',
    location: '台南市中西區',
    type: '文化設施',
    year: '2022',
    status: '已完成',
    image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&h=600&fit=crop&q=80',
    stats: [
      { label: '工期縮短', value: '33%', trend: 'down' },
      { label: '古蹟保護', value: '100%', trend: 'up' },
      { label: '遊客滿意', value: '4.8/5', trend: 'up' },
    ],
    description: '歷史建築活化工程，在保護古蹟的同時進行現代化改造。特殊設計的模板系統確保施工不影響歷史結構。',
    solutions: ['特殊結構'],
    area: '15,000 m²',
    floors: 4,
  },
];

const filters = ['全部', '進行中', '已完成', '商業大樓', '住宅大樓', '公共工程'];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('全部');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects =
    activeFilter === '全部'
      ? projects
      : projects.filter(
          (p) =>
            p.status === activeFilter ||
            p.type === activeFilter
        );

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-24 lg:py-32 bg-panshi-black overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="relative w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full mb-6">
              <Building2 className="w-4 h-4 text-panshi-lime" />
              <span className="text-sm font-medium text-white">案例展示</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6">
              數據化的<span className="text-panshi-lime">成功</span>
            </h1>
            <p className="text-xl text-panshi-light max-w-2xl leading-relaxed">
              從北到南，磐石系統模板已在全台多個指標性建案證明價值。
              每個數字背後，都是效率、成本與永續的實際提升。
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-panshi-lime">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '150+', label: '完成專案' },
              { value: '2M+', label: '模板組數' },
              { value: 'NT$50B+', label: '專案總值' },
              { value: '98%', label: '客戶滿意度' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-display font-bold text-panshi-black mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-panshi-black/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-12">
            <Filter className="w-5 h-5 text-panshi-medium" />
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-panshi-black text-white'
                    : 'bg-panshi-surface text-panshi-medium hover:bg-panshi-cement'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-structural transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-panshi-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.status === '進行中'
                          ? 'bg-panshi-lime text-panshi-black'
                          : 'bg-white/90 text-panshi-black'
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 text-white text-sm mb-1">
                      <MapPin className="w-4 h-4" />
                      <span>{project.location}</span>
                    </div>
                    <h3 className="text-xl font-display font-bold text-white">
                      {project.name}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-panshi-medium mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {project.year}
                    </span>
                    <span>{project.type}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-panshi-cement">
                    {project.stats.map((stat) => (
                      <div key={stat.label}>
                        <div className="flex items-center gap-1">
                          <span className="text-lg font-display font-bold text-panshi-black">
                            {stat.value}
                          </span>
                          {stat.trend === 'down' ? (
                            <TrendingDown className="w-4 h-4 text-green-500" />
                          ) : (
                            <TrendingUp className="w-4 h-4 text-panshi-lime" />
                          )}
                        </div>
                        <span className="text-xs text-panshi-medium">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Detail Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-display font-bold">
                  {selectedProject.name}
                </DialogTitle>
              </DialogHeader>
              
              <div className="mt-4">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.name}
                  className="w-full h-64 object-cover rounded-xl mb-6"
                />

                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm text-panshi-medium">
                    <MapPin className="w-4 h-4" />
                    {selectedProject.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-panshi-medium">
                    <Calendar className="w-4 h-4" />
                    {selectedProject.year}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-panshi-medium">
                    <Building2 className="w-4 h-4" />
                    {selectedProject.type}
                  </div>
                </div>

                <p className="text-panshi-medium mb-6">
                  {selectedProject.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-panshi-surface rounded-lg p-4">
                    <div className="text-sm text-panshi-medium mb-1">建築面積</div>
                    <div className="text-lg font-display font-semibold text-panshi-black">
                      {selectedProject.area}
                    </div>
                  </div>
                  <div className="bg-panshi-surface rounded-lg p-4">
                    <div className="text-sm text-panshi-medium mb-1">樓層數</div>
                    <div className="text-lg font-display font-semibold text-panshi-black">
                      {selectedProject.floors} 層
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-sm text-panshi-medium mb-2">使用方案</div>
                  <div className="flex gap-2">
                    {selectedProject.solutions.map((solution) => (
                      <span
                        key={solution}
                        className="px-3 py-1 bg-panshi-lime/20 text-panshi-black text-sm rounded-full"
                      >
                        {solution}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  {selectedProject.stats.map((stat) => (
                    <div key={stat.label} className="text-center bg-panshi-surface rounded-lg p-4">
                      <div className="text-2xl font-display font-bold text-panshi-black mb-1">
                        {stat.value}
                      </div>
                      <div className="text-xs text-panshi-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <button className="btn-panshi-primary w-full">
                  <Download className="w-4 h-4 mr-2" />
                  下載案例研究
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
