
$links = {}
def link_to(fn)
  $links[fn] = "https://apiref.page/package/bsearch/#{fn}"
  "[#{fn}][#{fn}]"
end

def print_use_case(name, small, large)
  puts "| #{name} | #{link_to small}<br>#{link_to large} | #{link_to small + 'Async'}<br>#{link_to large + 'Async'} |"
end

puts "| Use case | Sync | Async |"
puts "| --- | --- | --- |"
print_use_case('Integers', 'smallestInt', 'largestInt')
print_use_case('Floats', 'smallestFloat', 'largestFloat')
print_use_case('Array indices', 'firstIndex', 'lastIndex')
print_use_case('Array elements', 'firstElement', 'lastElement')
puts
$links.each do |k, v|
  puts "[#{k}]: #{v}"
end