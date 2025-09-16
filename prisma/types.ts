export const fieldTypes: Record<string, Record<string, 'string' | 'number' | 'boolean' | 'date'>> = {
  user: {
    id: 'number',
    firstname: 'string',
    lastname: 'string',
    email: 'string',
    description: 'string',
    password: 'string',
    image: 'string',
    refreshToken: 'string',
    isActive: 'boolean'
  },
  product: {
    id: 'number',
    name: 'string',
    slug: 'string',
    image: 'string',
    description: 'string',
    price: 'number',
    stock: 'number',
    roast: 'number',
    isActive: 'boolean',
    createdAt: 'date'
  },
  testemony: {
    id: 'number',
    userId: 'number',
    content: 'string',
    createdAt: 'date'
  }
};