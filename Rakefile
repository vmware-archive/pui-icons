desc "Build the website from source"
task :build do
 puts "## Building website"
 status = system("npm run build")
 puts status ? "Build Successful" : "Build Failure"
end

desc "Deploy site to PWS"
task :pws_deploy => :build do
 system("cf push pivotalicons -f manifest.yml -p ./build")
end