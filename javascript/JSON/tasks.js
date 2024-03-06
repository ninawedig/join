let tasks = [
  {
    'id': '0',
    'title': 'Aufgabe 1',
    'description': 'Beschreibung für Aufgabe 1',
    'status': 'awaitFeedback',
    'assign_to': 'Max Mustermann',
    'due_date': '2024-03-10',
    'prio': 'urgent',
    'category': 'User Story',
    'subtasks': [
      {
        'id': 0,
        'description': 'Unteraufgabe 1 für Aufgabe 1',
        'status': 'toDo'
      },
      {
        'id': 1,
        'description': 'Unteraufgabe 2 für Aufgabe 1',
        'status': 'done'
      }
    ]
  },
  {
    'id': '1',
    'title': 'Aufgabe 2',
    'description': 'Beschreibung für Aufgabe 2',
    'status': 'inProgress',
    'assign_to': [
      {
        'id': 0,
        'member': 'Erika Musterfrau'
      },
      {
        'id': 1,
        'member': 'Max Mustermann'
      }
    ],
    'due_date': '2024-03-15',
    'prio': 'medium',
    'category': 'User Story',
    'subtasks': [
      {
        'id': 0,
        'description': 'Unteraufgabe 1 für Aufgabe 2',
        'status': 'toDo'
      }
    ]
  },
  {
    'id': '2',
    'title': 'Aufgabe 3',
    'description': 'Beschreibung für Aufgabe 3',
    'status': 'awaitFeedback',
    'assign_to': 'John Doe',
    'due_date': '2024-03-20',
    'prio': 'low',
    'category': 'Technical Task',
    'subtasks': []
  }
]