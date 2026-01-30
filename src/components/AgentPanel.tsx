'use client';

import { Agent, AgentStatus } from '@/types/agents';

interface AgentPanelProps {
  agents: Agent[];
}

const statusColors: Record<AgentStatus, { bg: string; text: string; dot: string }> = {
  active: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
  working: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500 animate-pulse' },
  idle: { bg: 'bg-gray-50', text: 'text-gray-500', dot: 'bg-gray-400' },
  error: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
};

export function AgentPanel({ agents }: AgentPanelProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">🤖 Agent Swarm</h2>
        <span className="text-sm text-gray-500">
          {agents.filter(a => a.status === 'working' || a.status === 'active').length} active
        </span>
      </div>
      
      <div className="space-y-3">
        {agents.map(agent => {
          const colors = statusColors[agent.status];
          return (
            <div
              key={agent.id}
              className={`${colors.bg} rounded-lg p-3 border border-gray-100`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{agent.emoji}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{agent.name}</span>
                      <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{agent.description}</p>
                  </div>
                </div>
              </div>
              
              {/* Stats */}
              <div className="flex gap-4 mt-2 pt-2 border-t border-gray-200/50">
                <div className="text-xs">
                  <span className="text-gray-500">Queue:</span>{' '}
                  <span className="font-medium text-gray-700">{agent.tasksInQueue}</span>
                </div>
                <div className="text-xs">
                  <span className="text-gray-500">Done:</span>{' '}
                  <span className="font-medium text-gray-700">{agent.tasksCompleted}</span>
                </div>
                {agent.currentTask && (
                  <div className="text-xs text-blue-600 truncate flex-1">
                    Working: {agent.currentTask}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function AgentPanelCompact({ agents }: AgentPanelProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <h2 className="text-sm font-semibold text-gray-700 mb-3">🤖 Agent Status</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
        {agents.map(agent => {
          const colors = statusColors[agent.status];
          return (
            <div
              key={agent.id}
              className={`${colors.bg} rounded-lg p-2 text-center`}
              title={agent.description}
            >
              <div className="text-xl mb-1">{agent.emoji}</div>
              <div className="text-xs font-medium text-gray-700 truncate">{agent.name}</div>
              <div className="flex items-center justify-center gap-1 mt-1">
                <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                <span className={`text-xs ${colors.text}`}>
                  {agent.tasksInQueue > 0 ? `${agent.tasksInQueue} tasks` : agent.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
